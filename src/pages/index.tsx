import Head from "next/head";
import styles from "@/styles/Home.module.css";
import html2canvas from "html2canvas";
import { useState, useRef } from "react";

export default function Home() {
  const [image, setImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const componentRef = useRef<HTMLElement>(null);

  const takeScreenshotHandler = async () => {
    if (!componentRef.current) return;

    await html2canvas(componentRef.current, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      setImage(canvas.toDataURL("image/png"));
      setIsModalOpen(true);
    });
  };
  return (
    <>
      <Head>
        <title>HTML to Canvas Sample</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main ref={componentRef} className={styles.main}>
        <div className={styles.center}>
          <div
            style={{
              display: "flex ",
              flexDirection: "column",
              alignItems: "center",
              gap: 50,
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            <img
              style={{
                borderRadius: "20px",
                boxShadow: " 0px 0px 30px 0px",
              }}
              src="/T033R2U4JCE-U03GEGFL2RZ-c5e2af696a14-512.jpg"
            />
            <p>Front Phoenix</p>
          </div>
        </div>
        <div>
          <button
            data-html2canvas-ignore="true"
            style={{ width: "100%", cursor: "pointer" }}
            className={styles.thirteen}
            onClick={takeScreenshotHandler}
          >
            Take Screen Shot
          </button>
        </div>
        {isModalOpen && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              backgroundColor: "#000001",
            }}
          >
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80vw",
                height: "80vh",
                border: "1px solid white",
                borderRadius: "20px",
                backgroundColor: "black",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
                onClick={() => {
                  setIsModalOpen(false);
                  setImage("");
                }}
              >
                X
              </div>
              <img
                style={{
                  width: "80%",
                  height: "80%",
                }}
                src={image}
              />
              <div>
                <a
                  style={{ width: "100%", cursor: "pointer" }}
                  className={styles.thirteen}
                  href={image}
                  download="ScreenShot"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
