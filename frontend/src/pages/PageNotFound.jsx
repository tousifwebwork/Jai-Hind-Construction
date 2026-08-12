import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
        <style>{`
      @font-face {
        font-family: "Geist Mono:SemiBold";
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url("https://static.figma.com/font/GeistMono_wght__1") format("woff2");
      }

      html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      main {
        position: relative;
        min-height: 100svh;
        width: 100%;
        background-color: #000000;
        overflow-x: hidden;
        overflow-y: auto;
      }

      video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        z-index: 0;
      }

      .logo-wrapper {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 14px;
        z-index: 10;
      }

      .logo-mark {
        width: 54px;
        height: 40px;
        flex-shrink: 0;
      }

      .logo-mark svg {
        width: 100%;
        height: 100%;
      }

      .logo-text {
        width: 164.311px;
        height: 100px;
        flex-shrink: 0;
      }

      .logo-text svg {
        width: 100%;
        height: 100%;
      }

      .content-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 483px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 44px;
      }

      .heading-404 {
        font-family: "Geist Mono:SemiBold", monospace;
        font-size: 295.751px;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: -24.6459px;
        background: linear-gradient(
          247.3282658084845deg,
          rgb(255, 255, 255) 2.5334%,
          rgba(255, 255, 255, 0.4) 93.612%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        margin: 0;
        padding: 0;
        height: auto;
        min-height: 0;
      }

    //   .divider {
    //     width: 425px;
    //     height: 1px;
    //     background-color: white;
    //     border: none;
    //   }

      .message {
        font-family: "Geist Mono:SemiBold", monospace;
        font-size: 24px;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: -2px;
        color: white;
        margin: 0;
        padding: 0;
        width: 483px;
      }

      /* Mobile responsive */
      @media (max-width: 640px) {
        .logo-wrapper {
          top: 32px;
          transform: translateX(-50%) scale(0.75);
          transform-origin: top center;
        }

        .content-wrapper {
          width: min(calc(100% - 40px), 360px);
          gap: 28px;
        }

        .heading-404 {
          font-size: clamp(140px, 52vw, 200px);
          letter-spacing: -0.09em;
          width:350px
        }

        .divider {
          width: 100%;
        }

        .message {
          font-size: clamp(16px, 4.5vw, 20px);
          letter-spacing: -1.3px;
          width: 100%;
        }
      }
    `}</style>

    <main>
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
          type="video/mp4"
        />
      </video>

      {/* <div className="logo-wrapper" aria-label="LGPSM">
        <div className="logo-mark">
          <svg viewBox="0 0 54 40" fill="none">
            <path d="M38 0H26V12H38V0Z" fill="white" />
            <path d="M54 12H38V28H54V12Z" fill="white" />
            <path d="M38 28H26V40H38V28Z" fill="white" />
            <path d="M26 12H16V22H26V12Z" fill="white" />
            <path d="M16 22H8V30H16V22Z" fill="white" />
            <path d="M16 2H6V12H16V2Z" fill="white" />
            <path d="M6 12H0V18H6V12Z" fill="white" />
          </svg>
        </div>
        <div className="logo-text">
          <svg viewBox="0 0 164.311 100" fill="white">
            <path
              d="M122.498 37.4573H131.321L139.533 51.6222L147.772 37.4573H156.595V56.0604H152.449V37.6433L141.739 56.0604H137.354L126.617 37.6433V56.0604H122.498V37.4573ZM95.921 48.8317C92.785 48.8317 90.261 46.307 90.261 43.1445C90.261 40.0086 92.785 37.4573 95.921 37.4573H119.972V41.6031H95.921C95.071 41.6031 94.38 42.2941 94.38 43.1445C94.38 44.0215 95.071 44.7125 95.921 44.7125H114.285C117.421 44.7125 119.972 47.2372 119.972 50.3997C119.972 53.5357 117.421 56.0604 114.285 56.0604H90.261V51.9411H114.285C115.136 51.9411 115.827 51.2501 115.827 50.3997C115.827 49.5227 115.136 48.8317 114.285 48.8317H95.921ZM80.857 37.4573C84.843 37.4573 88.086 40.6995 88.086 44.7125C88.086 48.6989 84.843 51.9411 80.857 51.9411H62.254V56.0604H58.135V37.4573H80.857ZM80.83 47.7953C82.558 47.7953 83.94 46.4133 83.94 44.7125C83.94 42.985 82.558 41.6031 80.83 41.6031H62.254V47.7953H80.83ZM35.975 41.6031C33.105 41.6031 30.7927 43.9152 30.7927 46.7588C30.7927 49.629 33.105 51.9411 35.975 51.9411H51.336V48.6989H35.576V44.5796H55.482V56.0604H35.975C30.8192 56.0604 26.6734 51.9145 26.6734 46.7588C26.6734 41.6297 30.8192 37.4573 35.975 37.4573H55.482V41.6031H35.975ZM0 56.0604V37.4573H4.1192V51.9411H24.9281V56.0604H0ZM164.311 36.4177C164.311 37.7529 163.228 38.8354 161.893 38.8354C160.558 38.8354 159.475 37.7529 159.475 36.4177C159.475 35.0824 160.558 34 161.893 34C163.228 34 164.311 35.0824 164.311 36.4177Z"
              fill="white"
            />
          </svg>
        </div>
      </div> */}

      <div className="content-wrapper"> 
        <h1 className="md:order-1 heading-404 md:w-150">404</h1>
        <div className="md:order-2 border h-0 border-white w-full md:w-300px md:hidden" />
        <p className="md:order-3 message "> The path may be broken, but the journey isn't. Let's get you back. </p>
        <div className="md:order-4 border h-0 border-white w-full md:w-300px md:hidden" />
        <Link className='md:order-2 text-white text-2xl border border-white px-4 py-2' to='/'>Back to Home</Link> 
      </div>

      
    </main>
    </div>
  )
}

export default PageNotFound
