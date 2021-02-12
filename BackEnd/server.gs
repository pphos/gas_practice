/**
 * POSTリクエストが送信されたときに実行される
 * @params   e
 * @returns {TextOutput}
*/
function doPost(e) {
  let contents = JSON.parse(e.postData.getDataAsString());
  const { method = '', endpoint = '', params = {} } = contents;

  let result
  try {
    switch (method) {
      case 'POST':
        result = onPost(params);
        break;
      case 'GET':
        result = onGetController(endpoint, params);
        break;
      default:
        result = { error: 'methodを指定してください' }
    }
  } catch (e) {
    result = { error : e }
  }
  return response(result);
}

/**
 * レスポンスを作成してクライアントに返却
 * @params {*} content
 * @returns {TextOutput}
 */
function response(content) {
  const res = ContentService.createTextOutput();
  res.setMimeType(ContentService.MimeType.JSON);
  res.setContent(JSON.stringify(content))
  return res
}

function doGet() {
  return response(getAllPoints());
}

/**
 * データの取得
 * @param endpoint : アクセス対象のエンドポイント
 * @param params   : パラメータ
 */
function onGetController(endpoint, params) {
  switch (endpoint) {
    case '/points':
      return getAllPoints();
    default:
      return { error : 'エンドポイントを指定してください' };
  }
}

function getAllPoints() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Sheet1');
  const rows = sheet.getDataRange().getValues();
  const keys = rows.splice(0, 1)[0];
  return rows.map((row) => {
    let obj = {};
    row.map((item, index) => {
      obj[String(keys[index])] = String(item);
    });
    return obj
  });
}


/**
 * データを追加する
 * @param params
 */
function onPost(params) {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Sheet1');
  appendRow(sheet, params);
}

/**
 * シートに行を追加
 * @param sheet     : 操作対象のシート
 * @param parameter : シートに追加するパラメータ
 */
function appendRow(sheet, parameter) {
  parameter['id'] = Utilities.getUuid();
  const row = createRow(sheet, parameter);
  sheet.appendRow(row);
}

/**
 * 行を作成
 * @param sheet     : 操作対象のシート
 * @param parameter : 行に追加するパラメータ
 */
function createRow(sheet, parameter) {
  const keys = sheet.getDataRange().getValues()[0];
  let row = [];
  keys.map((key) => {
    const value = parameter[key]
    if (value) {
      row.push(value);
    }
  });
  return row;
}