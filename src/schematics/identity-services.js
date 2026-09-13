// SCH-IDENTITY — SAP Cloud Identity Services, reconstruído a partir do
// diagrama oficial da SAP. Explica a peça que entra em quase todos os
// landscapes desta app (o card `ias`) e que no modo Necessidades está
// marcada como sempre-activa: quem é a pessoa, onde vive a conta, e como
// é que a conta chega a cada aplicação.
//
// A legenda do original tem três tipos de seta e eles estão preservados:
//   auth         autenticação            (verde, sólida)
//   delegada     autenticação delegada   (verde, tracejada)
//   provisioning aprovisionamento        (clara, sólida)
export default {
  id: 'identity-services',
  titulo: {
    pt: 'SAP Cloud Identity Services (identidade)',
    en: 'SAP Cloud Identity Services',
    fr: 'SAP Cloud Identity Services (identité)',
    de: 'SAP Cloud Identity Services (Identität)',
    es: 'SAP Cloud Identity Services (identidad)',
  },
  hero: {
    pt: 'O utilizador autentica-se no Identity Authentication, que delega no IdP da empresa; o Identity Directory guarda a conta e o Identity Provisioning empurra-a para cada aplicação SAP. Autenticar e aprovisionar são dois caminhos diferentes — é a confusão mais comum nesta camada.',
    en: 'The user authenticates against Identity Authentication, which delegates to the corporate IdP; Identity Directory stores the account and Identity Provisioning pushes it into each SAP application. Authenticating and provisioning are two different paths — the most common confusion in this layer.',
  },
  fonte: 'SAP — Cloud Identity Services, diagrama de arquitectura (reconstruído)',
  dominio: 'opsec',
  cenarios: [{ id: 'completo', nome: { pt: 'Arquitectura completa', en: 'Full architecture' } }],
  computarEstiloNo: () => ({}),
  nodes: [
    { id: 'actor-user', type: 'actor', position: { x: 20, y: 60 }, data: { label: 'Business User', icone: 'user' } },
    { id: 'corporate-idp', type: 'item', position: { x: 10, y: 185 }, style: { width: 165, height: 52, zIndex: 1 }, data: { label: 'Corporate IdP', nota: 'Entra ID · Okta · outro', dominio: 'nonsap' } },

    { id: 'cis', type: 'container', position: { x: 215, y: 10 }, style: { width: 600, height: 340, zIndex: 0 }, data: { titulo: 'SAP Cloud Identity Services', icone: 'shield', dominio: 'identidade', cardId: 'ias' } },
    { id: 'ias-auth', type: 'item', position: { x: 240, y: 65 }, style: { width: 190, height: 52, zIndex: 2 }, data: { label: 'Identity Authentication', nota: 'IAS — quem és', cardId: 'ias', dominio: 'identidade' } },
    { id: 'ias-prov', type: 'item', position: { x: 570, y: 150 }, style: { width: 215, height: 46, zIndex: 2 }, data: { label: 'Identity Provisioning', nota: 'IPS — ciclo de vida da conta', cardId: 'ias', dominio: 'identidade' } },
    { id: 'ias-authz', type: 'item', position: { x: 570, y: 212 }, style: { width: 215, height: 56, zIndex: 2 }, data: { label: 'Authorization Management', nota: 'para aplicações no BTP', cardId: 'ias', dominio: 'identidade' } },
    { id: 'ias-dir', type: 'item', position: { x: 300, y: 268 }, style: { width: 210, height: 52, zIndex: 2 }, data: { label: 'Identity Directory', nota: 'persistência da conta', cardId: 'ias', dominio: 'identidade' } },

    { id: 'apps', type: 'container', position: { x: 905, y: 10 }, style: { width: 235, height: 340, zIndex: 0 }, data: { titulo: 'SAP Cloud Applications', icone: 'cloud', dominio: 'sap' } },
    { id: 'app-sac', type: 'item', position: { x: 922, y: 60 }, style: { width: 200, height: 34, zIndex: 1 }, data: { label: 'SAP Analytics Cloud', cardId: 'sac', dominio: 'dados' } },
    { id: 'app-s4', type: 'item', position: { x: 922, y: 103 }, style: { width: 200, height: 34, zIndex: 1 }, data: { label: 'SAP S/4HANA Cloud', cardId: 's4hana', dominio: 'sap' } },
    { id: 'app-sf', type: 'item', position: { x: 922, y: 146 }, style: { width: 200, height: 34, zIndex: 1 }, data: { label: 'SAP SuccessFactors', cardId: 'successfactors', dominio: 'sap' } },
    { id: 'app-btp', type: 'item', position: { x: 922, y: 189 }, style: { width: 200, height: 34, zIndex: 1 }, data: { label: 'SAP BTP', cardId: 'btp', dominio: 'btp' } },
    { id: 'app-fg', type: 'item', position: { x: 922, y: 232 }, style: { width: 200, height: 34, zIndex: 1 }, data: { label: 'SAP Fieldglass', cardId: 'fieldglass', dominio: 'sap' } },
    { id: 'app-etc', type: 'item', position: { x: 922, y: 275 }, style: { width: 200, height: 30, zIndex: 1 }, data: { label: '…', nota: 'e o resto da suite', dominio: 'sap' } },

    { id: 'user-stores', type: 'item', position: { x: 300, y: 415 }, style: { width: 210, height: 52, zIndex: 1 }, data: { label: 'User Stores', nota: 'AD / LDAP on-premise', dominio: 'onprem' } },
  ],
  edges: [
    { id: 'e1', source: 'actor-user', target: 'ias-auth', type: 'sapEdge', label: 'Authentication', data: { tipo: 'auth', animado: true, frase: 'A pessoa entra sempre pelo Identity Authentication — é a porta única da suite.' } },
    { id: 'e2', source: 'ias-auth', target: 'corporate-idp', type: 'sapEdge', label: 'Delegated Authentication', sourceHandle: 'b', targetHandle: 't', data: { tipo: 'delegada', animado: false, frase: 'O IAS não substitui o IdP da empresa: delega nele. Quem valida a palavra-passe continua a ser o Entra ID / Okta.' } },
    { id: 'e3', source: 'ias-auth', target: 'apps', type: 'sapEdge', label: 'SAML / OpenID Connect', data: { tipo: 'auth', animado: true, frase: 'Identity Authentication and SSO: um login serve para SAC, S/4, SuccessFactors, BTP e Fieldglass.' } },
    { id: 'e4', source: 'ias-auth', target: 'ias-dir', type: 'sapEdge', label: 'Data Persistence', sourceHandle: 'b', targetHandle: 't', data: { tipo: 'provisioning', animado: false, frase: 'A conta em si vive no Identity Directory.' } },
    { id: 'e5', source: 'ias-dir', target: 'ias-prov', type: 'sapEdge', data: { tipo: 'provisioning', animado: false, frase: 'O Identity Provisioning lê o directório para saber quem existe.' } },
    { id: 'e6', source: 'ias-dir', target: 'ias-authz', type: 'sapEdge', data: { tipo: 'provisioning', animado: false, frase: 'O Authorization Management usa a mesma fonte de identidades.' } },
    { id: 'e7', source: 'ias-prov', target: 'apps', type: 'sapEdge', label: 'Provisioning', data: { tipo: 'provisioning', animado: true, frase: 'Identity Lifecycle: criar, alterar e desactivar a conta em cada aplicação — nos dois sentidos, porque também lê o que já lá existe.' } },
    { id: 'e8', source: 'ias-authz', target: 'app-btp', type: 'sapEdge', label: 'Authorization', data: { tipo: 'provisioning', animado: false, frase: 'Gestão de autorizações para aplicações construídas no BTP.' } },
    { id: 'e9', source: 'user-stores', target: 'ias-dir', type: 'sapEdge', label: 'Cloud Connector', sourceHandle: undefined, targetHandle: 'b', data: { tipo: 'rede', animado: true, frase: 'Cloud Connector for On-Premise User Stores: o AD/LDAP da casa alimenta o directório sem abrir porta de entrada no firewall.' } },
  ],
}
