// https://ckeditor.com/ckeditor-5/online-builder/
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html

import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { URLS } from "@/router";
import { getToken } from "@/utils/manageToken";

export const Editor = ({ data, handler, subId }) => {
  // UploadAdapter Interface 를 implement 하여 CustomAdapter 구현
  class imageUploadAdapter {
    constructor(loader) {
      // 업로드 시 사용될 file loader 객체 인스턴스 생성
      this.loader = loader;
      this.path = URLS.UPLOAD_ROUTE;
      this.url = URLS.UPLOADS;
    }

    // 업로드 method
    upload() {
      return this.loader.file.then(
        (file) =>
          // Promise 객체 생성(pending; 비동기 처리가 수행되지 않은 상태)
          // 콜백 함수 내에서 비동기 처리
          // 콜백 함수는 resolve, reject 함수를 인수로 받아서 처리 성공 또는 실패 시 각각 호출
          new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
          })
      );
    }

    // 업로드 중단 method
    abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }

    // XMLHttpRequest 객체(XHR) 생성 method
    _initRequest() {
      const xhr = (this.xhr = new XMLHttpRequest());
      xhr.open("POST", this.path, true);
      xhr.responseType = "json";
      xhr.setRequestHeader("Authorization", `Bearer ${getToken()}`);
    }

    // XMLHttpRequest 리스너 초기화 method
    _initListeners(resolve, reject, file) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `파일 업로드에 실패했습니다 : ${file.name}.`;

      xhr.addEventListener("error", () => reject(genericErrorText));
      xhr.addEventListener("abort", () => reject());
      xhr.addEventListener("load", () => {
        const response = xhr.response;

        // response 객체의 값이 없거나 error 를 포함할 경우
        // Promise.reject 실행(rejected;업로드 실패)
        if (!response || response.error) {
          return reject(
            response && response.error
              ? response.error.message
              : genericErrorText
          );
        }

        // 위의 if 문에 걸리지 않으면 Promise.resolve 실행(fulfilled;업로드 성공)
        // response 가 보낸 url 을 img tag 의 src 에 삽입
        resolve({
          default: `${this.url}/${response.url}`,
        });
      });

      if (xhr.upload) {
        xhr.upload.addEventListener("progress", (evt) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total;
            loader.uploaded = evt.loaded;
          }
        });
      }
    }

    // 데이터 생성 및 request 요청 method
    _sendRequest(file) {
      const data = new FormData();
      data.append("upload", file);
      data.append("subid", subId);
      this.xhr.send(data);
    }
  }

  // for editor issue when refresh page
  if (data === undefined) return null;

  return (
    <CKEditor
      editor={CustomEditor}
      config={{
        // mediaEmbed: 미디어(영상) 링크 embed 하여
        // 게시글 저장 시 oembed 대신 iframe tag 로 저장
        mediaEmbed: {
          previewsInData: true,
        },
      }}
      data="<p></p>"
      onReady={(editor) => {
        // adapter plugin
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          loader.on("change:uploadResponse", (evt, name, val, oldval) => {
            if (val) console.log(val); // { default: "image link" }
          });
          return new imageUploadAdapter(loader);
        };
        // setting data
        editor.setData(data);
      }}
      onChange={handler}
      onBlur={(event, editor) => {}}
      onFocus={(event, editor) => {}}
    />
  );
};

export default Editor;
