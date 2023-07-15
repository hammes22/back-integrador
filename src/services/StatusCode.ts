export const StatusCode = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  Non_Authoritative: 203,
  No_Content: 204,
  Reset_Content: 205,
  Partial_Content: 206,
  Multi_Status: 207,
  IM_Used: 226,
  Multiple_Choice: 300,
  Moved_Permanently: 301,
  Found: 302,
  See_Other: 303,
  Not_Modified: 304,
  Use_Proxy_Descontinuada: 305,
  unused_Descontinuada: 306,
  Temporary_Redirect: 307,
  Bad_Request: 400,
  Unauthorized: 401,
  Payment_Required_Experimental: 402,
  Forbidden: 403,
  Not_Found: 404,
  Method_Not_Allowed: 405,
  Not_Acceptable: 406,
  Proxy_Authentication_Required: 407,
  Request_Timeout: 408,
  Conflict: 409,
  Gone: 410,
  Length_Required: 411,
  Precondition_Failed: 412,
  Payload_Too_Large: 413,
  URI_Too_Long: 414,
  Unsupported_Media_Type: 415,
  Requested_Range_Not_Satisfiable: 416,
  Expectation_Failed: 417,
  Im_a_teapot: 418,
  Misdirected_Request: 421,
  Unprocessable_Entity: 422,
  Locked: 423,
  Failed_Dependency: 424,
  Too_Early: 425,
  Upgrade_Required: 426,
  Precondition_Required: 428,
  Too_Many_Requests: 429,
  Request_Header_Fields_Too_Large: 431,
  Internal_Server_Error: 500,
  Not_Implemented: 501,
  Bad_Gateway: 502,
  Service_Unavailable: 503,
  HTTP_Version_Not_Supported: 505,
  Variant_Also_Negotiates: 506,
  Insufficient_Storage: 507,
  Loop_Detected: 508,
  Not_Extended: 510,
  Network_Authentication_Required: 511,
};

/*
200 OK
Estas requisições foram bem-sucedidas. O significado do sucesso varia de acordo com o método HTTP:

201 Created
A requisição foi bem aceita e um novo recurso foi criado como resultado. Esta é uma resposta típica enviada após uma requisição POST.

202 Accepted
A requisição foi recebida, mas nenhuma ação foi tomada sobre ela. Isto é uma requisição não-comprometida, o que significa que não há nenhuma maneira no HTTP para enviar uma resposta assíncrona indicando o resultado do processamento da solicitação. Isto é indicado para casos em que outro processo ou servidor lida com a requisição, ou para processamento em lote.

203 Non-Authoritative Information
Esse código de resposta significa que o conjunto de meta-informações retornadas não é o conjunto exato disponível no servidor de origem, mas coletado de uma cópia local ou de terceiros. Exceto essa condição, a resposta de 200 OKdeve ser preferida em vez dessa resposta.

204 No Content
Não há conteúdo para enviar para esta solicitação, mas os cabeçalhos podem ser úteis. O user-agent pode atualizar seus cabeçalhos em cache para este recurso com os novos.

205 Reset Content
Esta requisição é enviada após a realização da solicitação para informar ao agente do usuário redefinir a visualização do documento que inveja essa solicitação.

206 Partial Content
Esta resposta é usada por causa do cabeçalho de intervalo enviado pelo cliente para separar o download em vários fluxos.

207 Multi-Status (pt-BR)( WebDAV (en-US) )
Uma resposta Multi-Status transmite informações sobre vários recursos em situações em que vários códigos de status podem ser apropriados.

208 Multi-Status (pt-BR)( WebDAV (en-US) )
Usado dentro de um elemento de resposta <dav:propstat>para evitar enumerar os membros internos de várias ligações à mesma coleção repetidamente.

226 IM Used (pt-BR)( codificação HTTP Delta )
O servidor cumpre uma solicitação GETpara o recurso e a resposta é uma representação do resultado de uma ou mais manipulações de instância aplicada à instância atual.

mensagens de redirecionamento
300 Multiple Choice
A requisição tem mais de uma resposta possível. User-agent ou o user deve escolher uma delas. Não há maneira padrão para escolher uma das respostas.

301 Moved Permanently
Esse código de resposta significa que a URI do recurso necessário mudou. provavelmente, a nova URI será especificada na resposta.

302 Found
Esse código de resposta significa que a URI do recurso obrigatório foi mudada temporariamente. Novas mudanças na URI poderão ser feitas no futuro. Portanto, a mesma URI deve ser usada pelo cliente em requisições futuras.

303 See Other
O servidor manda essa resposta para instruir ao cliente buscar o recurso solicitado em outra URI com uma requisição GET.

304 Not Modified
Essa resposta é usada para questões de cache. Diz ao cliente que a resposta não foi modificada. Portanto, o cliente pode usar a mesma versão em cache da resposta.

305 Use Proxy Descontinuada
Foi definido em uma versão anterior da especificação HTTP para indicar que uma resposta deve ser acessada por um proxy. Foi depreciada por questões de segurança em relação a configuração em banda de um proxy.

306 unused Descontinuada
Esse código de resposta não é mais utilizado, encontre-se reservado. Foi usado na versão anterior da especificação HTTP 1.1.

307 Temporary Redirect
O servidor mandou essa resposta direcionando o cliente a buscar o recurso requisitado em outra URI com o mesmo método que foi utilizado na requisição original. Tem a mesma semântica do código 302 Found, com a exceção de que o user-agent não deve mudar o método HTTP utilizado: se um POSTfoi utilizado na primeira requisição, um POSTdeve ser utilizado na segunda.

308 Permanent Redirect
Esse código significa que o recurso agora está permanentemente localizado em outro URI, especificado pelos cabeçalhos de resposta Location. Tem a mesma semântica do código de resposta HTTP 301 Moved Permanentlycom a exceção de que o user-agent não deve mudar o método HTTP utilizado: se um POSTfoi utilizado na primeira requisição, um POSTdeve ser utilizado na segunda.

Respostas de erro do cliente
400 Bad Request
Essa resposta significa que o servidor não entendeu a requisição, pois está com uma sintaxe inválida.

401 Unauthorized
Embora o HTTP padrão especifique "não autorizado", semanticamente, essa resposta significa "não autenticado". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.

402 Payment Required Experimental
Este código de resposta está reservado para uso futuro. O objetivo inicial da criação deste código era usá-lo para sistemas digitais de pagamento, porém ele não está sendo usado atualmente.

403 Forbidden
O cliente não tem direitos de acesso ao conteúdo, portanto, o servidor está rejeitando dar uma resposta. Diferente do código 401, aqui a identidade do cliente é conhecida.

404 Not Found
O servidor não pode encontrar o recurso solicitado. Este código de resposta talvez seja o mais famoso devido à frequência com que acontece na web.

405 Method Not Allowed
O método de solicitação é conhecido pelo servidor, mas foi desativado e não pode ser usado.

406 Not Acceptable
Essa resposta é enviada quando o servidor da Web após realizar uma negociação de conteúdo orientada pelo servidor, não encontrando nenhum conteúdo seguindo os critérios fornecidos pelo agente do usuário.

407 Proxy Authentication Required
semelhante ao 401 porem é necessário que a autenticação seja feita por um proxy.

408 Request Timeout
Esta resposta é enviada por alguns servidores em uma conexão ociosa, mesmo sem qualquer requisição prévia pelo cliente. Ela significa que o servidor gostaria de derrubar esta conexão em desuso. Esta resposta é muito usada já que alguns navegadores, como Chrome, Firefox 27+, ou IE9, usam o botão HTTP de pré-conexão para acelerar a navegação. Observe também que alguns servidores baixam a conexão sem enviar esta mensagem.

409 Conflict
Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.

410 Gone
Esta resposta será enviada quando o conteúdo solicitado for excluído permanentemente do servidor, sem nenhum endereço de redirecionamento. É esperado que os clientes removam seus caches e links para o recurso. A especificação HTTP espera que este código de status seja usado para "serviços promocionais de tempo limitado". APIs não devem se sentir obrigadas a indicar que recursos foram removidos com este código de status.

411 Length Required
O servidor rejeitou a requisição porque o campo Content-Lengthdo cabeçalho não está definido e o servidor o requer.

412 Precondition Failed
O cliente indicou nos seus cabeçalhos pré-condições que o servidor não atende.

413 Payload Too Large
A requisição de entidade é maior do que os limites definidos pelo servidor; o servidor pode fechar a conexão ou retornar um campo de cabeçalho Retry-After.

414 URI Too Long
A URI solicitada pelo cliente é maior do que o servidor aceita para interpretar.

415 Unsupported Media Type
O formato de mídia dos dados solicitados não é suportado pelo servidor, então o servidor rejeita a requisição.

416 Requested Range Not Satisfiable
O trecho especificado pelo campo Rangedo cabeçalho na requisição não pode ser preenchido; é possível que o trecho esteja fora do tamanho dos dados da URI alvo.

417 Expectation Failed
Este código de resposta significa que a espera indicada pelo campo Expectdo cabeçalho da requisição não pode ser atendida pelo servidor.

418 I'm a teapot
O servidor recusou a tentativa de coar café num bule de chá.

421 Misdirected Request (pt-BR)
A requisição foi direcionada a um servidor inapto para produzir a resposta. Pode ser enviado por um servidor que não está configurado para produzir respostas para uma combinação de esquema ("scheme") e autoridade inclusas na URI da requisição.

422 Unprocessable Entity( WebDAV (en-US) )
A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos.

423 Locked (pt-BR)( WebDAV (en-US) )
O recurso sendo acessado está travado.

424 Failed Dependency (pt-BR)( WebDAV (en-US) )
A requisição falhou devido a falha na requisição prévia.

425 Too Early
Indica que o servidor não está disposto a arriscar processar uma requisição que pode ser refeita.

426 Upgrade Required
O servidor se recusa a executar uma requisição usando o protocolo corrente, mas estará pronto para fazê-lo após o cliente atualizar para um protocolo diferente. O servidor envia um cabeçalho Upgrade (en-US)numa resposta 426para indicar o(s) protocolo(s) obrigatório(s).

428 Precondition Required
O servidor de origem requer que a resposta seja condicional. Feito para prevenir o problema da 'atualização perdida', onde um cliente pega o estado de um recurso (GET), modifica-o, e põe de volta no servidor (PUT), enquanto um terceiro modificou o estado no servidor, levando a um conflito.

429 Too Many Requests
O usuário inveja muitas requisições num dado tempo ("limitação de frequência").

431 Request Header Fields Too Large
O servidor não quer processar uma requisição porque os campos de cabeçalho são muito grandes. A requisição PODE ser experimentada novemente depois de reduzir o tamanho dos campos de cabeça.

451 Unavailable For Legal Reasons
O usuário requisitou um recurso ilegal, tal como uma página censurada por um governo.

Respostas de erro do Servidor
500 Internal Server Error
O servidor encontrou uma situação com a qual não sabe lidar.

501 Not Implemented
O método de requisição não é suportado pelo servidor e não pode ser manipulado. Os únicos métodos exigidos que os servidores suportam (e portanto não devem retornar este código) são GETe HEAD.

502 Bad Gateway
Esta resposta de erro significa que o servidor, ao trabalhar como um gateway a fim de obter uma resposta necessária para manipular a requisição, obteve uma resposta inválida.

503 Service Unavailable
O servidor não está pronto para manipular uma requisição. Causas comuns são um servidor em manutenção ou sobrecarregado. Observe que junto a esta resposta, uma página amigável explicando o problema deveria ser enviada. Estas respostas devem ser usadas para condições temporárias e o cabeçalho HTTP Retry-After:deve, se possível, conter o tempo estimado para recuperação do serviço. O webmaster também deve tomar cuidado com os cabeçalhos relacionados com o cache que são enviados com esta resposta, já que estas respostas de condições temporárias normalmente não deveriam ser postagens em cache.

504 Gateway Timeout
Esta resposta de erro é dada quando o servidor está presente como um gateway e não obtém uma resposta a tempo.

505 HTTP Version Not Supported
A versão HTTP usada na requisição não é suportada pelo servidor.

506 Variant Also Negotiates
O servidor tem um erro de configuração interno: a negociação transparente de conteúdo para a requisição resulta em uma circular de referência.

507 Insufficient Storage
O servidor tem um erro interno de configuração: a variante de recurso escolhida está configurada para entrar em negociação transparente de conteúdo com ele mesmo, e portanto não é uma ponta válida no processo de negociação.

508 Loop Detected( WebDAV (en-US) )
O servidor detectou um loop infinito ao processar uma requisição.

510 Not Extended
Exigem-se extensões posteriores à requisição para o servidor atendê-la.

511 Network Authentication Required
O código de status 511 indica que o cliente precisa se autenticar para ganhar acesso à rede.
*/
