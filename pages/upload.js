import useFetch from "use-http";

import { useCallback, useEffect, createRef } from "react";

const UPLOAD_OPTIONS = {
  expires: "1h"
};

function createUploadData(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("expires", "1h");
  return data;
}

export default function UploadPage() {
  const fileRef = createRef();

  const {
    post,
    loading,
    error,
    data
  } = useFetch("https://api.anonymousfiles.io", { cachePolicy: "no-cache" });
  const success = !loading && !error && data;

  const upload = useCallback(
    (ev) => {
      console.assert(fileRef.current);
      const file = fileRef.current.files[0];
      console.log(file);
      post(createUploadData(file));
    },
    [fileRef, post]
  );

  useEffect(() => {
    if (!success) return;
    navigator.clipboard.writeText(data.url);
  }, [success, data]);

  return (
    <div>
      <h2>Upload</h2>

      <form>
        <figure>
          <img
            alt="Everledger"
            src="https://www.everledger.io/wp-content/uploads/2019/12/El_logo_colour_12.09.png"
          ></img>
        </figure>

        <label htmlFor="file">Image File</label>
        <input id="file" ref={fileRef} type="file" accept="image/*"></input>

        <button type="button" onClick={upload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>

        {success && (
          <>
            <p>Image successfully uploaded!</p>
            <label htmlFor="url">Image URL</label>
            <input id="url" type="text" readOnly value={data.url}></input>
            <p>URL has also been copied to the clipboard!</p>
          </>
        )}

        {!loading && error && <p>An error occured!</p>}

        {!loading && data && (
          <>
            <label htmlFor="response">Raw Response</label>
            <textarea
              id="response"
              cols={80}
              rows={10}
              readOnly
              value={JSON.stringify(data, undefined, 2)}
            ></textarea>
          </>
        )}
      </form>
    </div>
  );
}
