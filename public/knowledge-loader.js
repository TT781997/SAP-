export async function decodeKnowledgeResponse(response) {
  if(!response.ok)throw Error(`Falha ${response.status} ao carregar a documentação`);
  const bytes=new Uint8Array(await response.arrayBuffer());
  // Browsers may already have decompressed an HTTP Content-Encoding response.
  if(bytes[0]!==0x1f||bytes[1]!==0x8b)return JSON.parse(new TextDecoder().decode(bytes));
  if(!globalThis.DecompressionStream)throw Error('Este browser não suporta leitura do corpus comprimido. Consulta a fonte original.');
  return JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
}
