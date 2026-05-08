import Script from "next/script";

/**
 * Optional Google Tag Manager snippet — **not mounted** in root layout by default.
 * To use: add `<GoogleTagManager />` to `layout.tsx` and set `NEXT_PUBLIC_GTM_CONTAINER_ID` (e.g. `GTM-XXXXXXX`).
 *
 * Skips development unless `NEXT_PUBLIC_GTM_IN_DEV=true`.
 */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID?.trim();
  if (!gtmId) return null;

  const skipInDev =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_GTM_IN_DEV !== "true";

  if (skipInDev) {
    return null;
  }

  return (
    <>
      <Script id="gtm-init" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
