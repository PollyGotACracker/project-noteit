// https://ckeditor.com/ckeditor-5/online-builder/
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html

import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useRecoilValue } from "recoil";
import { tokenState } from "@recoils/user";
import { SERVER_URL, UPLOAD_URL } from "@/router";

export const Editor = ({ data, handler, subId }) => {
  const token = useRecoilValue(tokenState);

  class imageUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then((file) => this._sendRequest(file));
    }

    abort() {
      if (this.controller) {
        this.controller.abort();
      }
    }

    async _sendRequest(file) {
      const data = new FormData();
      data.append("upload", file);
      data.append("subid", subId);

      this.controller = new AbortController();
      const signal = this.controller.signal;

      const endPoint = `${SERVER_URL}/note/upload`;
      const options = {
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
        signal,
      };
      const res = await fetch(endPoint, options);
      if (!res.ok) {
        throw new Error(`파일 업로드에 실패했습니다 : ${file.name}.`);
      }
      const resData = await res.json();
      if (resData.error) {
        throw new Error(resData.error.message);
      }

      return {
        default: `${UPLOAD_URL}/${resData.url}`,
      };
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
