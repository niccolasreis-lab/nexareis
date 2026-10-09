import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
const flows = ["chamaai", "formularios"].map((n) =>
  JSON.parse(
    readFileSync(
      new URL("../workflow-n8n-" + n + ".json", import.meta.url),
      "utf8",
    ),
  ),
);
const expr = (s, j) =>
  vm.runInNewContext(
    "(" + s.slice(3, -2) + ")",
    { $json: j },
    { timeout: 1000 },
  );
const code = (s, j) =>
  vm.runInNewContext(
    "(function(){" + s + "})()",
    { $json: j },
    { timeout: 1000 },
  )[0].json;
for (const w of flows) {
  const send = w.nodes.find((n) => n.type === "n8n-nodes-base.httpRequest");
  const check = w.nodes.find((n) => n.id === "confirm-whatsapp");
  const respond = w.nodes.find(
    (n) => n.type === "n8n-nodes-base.respondToWebhook",
  );
  test(
    w.name + ": fixed destination, credential, endpoint and failure policy",
    () => {
      assert.equal(send.credentials.evolutionApi.name, "Assistente do Ni");
      assert.equal(send.parameters.authentication, "predefinedCredentialType");
      assert.equal(
        send.parameters.url,
        "https://1-evolution-api.n3hukr.easypanel.host/message/sendText/Assistente%20do%20Ni",
      );
      assert.equal(send.parameters.options.timeout, 10000);
      assert.equal(
        expr(send.parameters.jsonBody, {
          body: { phone: "5511000000000" },
          whatsappText: "QA",
        }).number,
        "5511937105501",
      );
      assert.equal(w.connections[send.name].main[0][0].node, check.name);
      assert.equal(w.connections[check.name].main[0][0].node, respond.name);
      assert.equal(
        w.nodes.some((n) => n.type.includes("telegram")),
        false,
      );
      assert.equal(JSON.stringify(w).includes("api.telegram.org"), false);
      for (const n of w.nodes) {
        assert.notEqual(n.continueOnFail, true);
        assert.notEqual(n.retryOnFail, true);
      }
    },
  );
  test(
    w.name + ": reject missing, negative and unrelated acknowledgements",
    () => {
      const good = {
        key: {
          id: "qa-id",
          fromMe: true,
          remoteJid: "5511937105501@s.whatsapp.net",
        },
        status: "PENDING",
      };
      for (const [input, expected] of [
        [good, true],
        [{}, false],
        [{ ok: true }, false],
        [{ success: true }, false],
        [{ ...good, status: "ERROR" }, false],
        [{ ...good, key: { ...good.key, id: "" } }, false],
        [{ ...good, key: { ...good.key, fromMe: false } }, false],
        [
          {
            ...good,
            key: { ...good.key, remoteJid: "5511000000000@s.whatsapp.net" },
          },
          false,
        ],
        [{ ...good, status: undefined }, false],
      ]) {
        const out = code(check.parameters.jsCode, input);
        assert.equal(out.ok, expected);
        assert.equal(out.success, expected);
        assert.equal(out.delivery, "whatsapp");
        assert.equal(
          expr(respond.parameters.options.responseCode, out),
          expected ? 200 : 502,
        );
        assert.equal(expr(respond.parameters.responseBody, out).ok, expected);
      }
    },
  );
}
test("lead aliases, special characters and WhatsApp links remain intact", () => {
  const send = flows[0].nodes.find(
    (n) => n.type === "n8n-nodes-base.httpRequest",
  );
  const body = {
    name: "Ana <&>",
    businessName: "Mercado",
    email: "qa@example.test",
    phone: "(11) 99999-0000",
    segment: "varejo",
    currentPain: "Texto <tag> & acentos",
    city: "São Paulo",
    state: "SP",
    locations: 2,
    platforms: ["Site", "App"],
  };
  const alias = {
    ...body,
    nome: body.name,
    empresa: body.businessName,
    whatsapp: body.phone,
    segmento: body.segment,
    mensagem: body.currentPain,
  };
  for (const k of ["name", "businessName", "phone", "segment", "currentPain"])
    delete alias[k];
  const text = expr(send.parameters.jsonBody, { body }).text;
  assert.equal(text, expr(send.parameters.jsonBody, { body: alias }).text);
  for (const v of [
    "Ana <&>",
    "Texto <tag> & acentos",
    "https://wa.me/5511999990000",
    "São Paulo",
    "Site, App",
  ])
    assert.ok(text.includes(v));
  assert.equal(text.includes("<b>"), false);
  assert.equal(text.includes("&amp;"), false);
});
test("general form required fields and labels remain valid", () => {
  const prep = flows[1].nodes.find(
    (n) => n.name === "Validar e detalhar formulário",
  );
  const body = {
    nome: "QA",
    empresa: "Teste",
    email: "qa@example.test",
    whatsapp: "11999990000",
    segmento: "varejo",
    necessidade: "sob-medida",
    mensagem: "Teste & <acentos>",
    origem: "QA",
  };
  const out = code(prep.parameters.jsCode, { body });
  for (const v of [
    "qa@example.test",
    "Teste & <acentos>",
    "Sistema Customizado Sob Medida",
    "Varejo / Franquias",
  ])
    assert.ok(out.whatsappText.includes(v));
  assert.throws(
    () => code(prep.parameters.jsCode, { body: { ...body, email: "" } }),
    /CAMPOS_OBRIGATORIOS_AUSENTES:email/,
  );
});
