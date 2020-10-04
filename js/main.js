const uploadFileInput = document.getElementById("uploadFileInput");
const previewVideo = document.getElementById("previewUploadVideo");
const downloadFileBtn = document.getElementById("downloadUploadFileBtn");

let uploadedFile = [];

// ファイル選択時の挙動
uploadFileInput.addEventListener("change", () => {
  const sizeLimit = 1024 * 1024 * 30;
  const file = uploadFileInput.files[0];

  if (!file || !file.type == "video/*") {
    alert("動画ファイルを選択してください");
    uploadFileInput.value = null;

    return;
  }

  if (file.size > sizeLimit) {
    alert("ファイルサイズは30MB以下にしてください");
    uploadFileInput.value = null;

    return;
  }

  // 既にファイルが選択されている場合は初期化
  if (uploadedFile.length) {
    uploadedFile = [];
  }

  // ダウンロード用に格納
  uploadedFile.push(file);

  // 動画のプレビュー
  previewFile(file);
});

/**
* ファイルダウンロード
*/
downloadFileBtn.addEventListener("click", () => {
  if (!uploadedFile.length) {
    alert("ファイルを選択してください");
    return;
  }

  console.log(uploadedFile[0].name);
  let fileName = uploadedFile[0].name;
  let url = window.URL.createObjectURL(
    new Blob(uploadedFile, { type: "video/*" })
  );
  let a = document.createElement("a");

  a.setAttribute("download", fileName);
  a.setAttribute("href", url);
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
});

/**
* プレビュー作成
* 注：.movファイルのプレビューにはコーデック変更必須
*/
function previewFile(file) {
  let width = 300;
  let height = 0;
  
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    previewVideo.src = event.target.result;
    previewVideo.setAttribute("controls", "");
    previewVideo.muted = true;
    previewVideo.setAttribute("width", width);
    height = previewVideo.videoHeight / (previewVideo.videoWidth / width);
    previewVideo.setAttribute("height", height);
  };
}
