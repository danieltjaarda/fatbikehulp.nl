import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import DashboardLayout from '@/components/DashboardLayout'
import { CartProvider } from '@/lib/cart-context'
import CartDrawer from '@/components/CartDrawer'

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fatbike reparatie door heel Nederland - Fatbikehulp.nl',
  description: 'Professionele fatbike reparatie aan huis en onderhoud op locatie. Binnen 3 dagen op uw stoep, waar u ook bent in Nederland. Ervaren technici, transparante tarieven en 3 maanden garantie.',
  keywords: 'fatbike reparatie aan huis, fatbike onderhoud nederland, elektrische fiets reparatie, fatbike service heel nederland, mobiele fatbike monteur, fatbike storing, fatbike problemen oplossen, fatbike garantie',
  metadataBase: new URL('https://www.fatbikehulp.nl'),
  openGraph: {
    title: 'Fatbike reparatie door heel Nederland - Fatbikehulp.nl',
    description: 'Professionele fatbike reparatie en onderhoud op locatie door heel Nederland. Binnen 3 dagen op uw stoep.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatbike reparatie door heel Nederland - Fatbikehulp.nl',
    description: 'Professionele fatbike reparatie en onderhoud op locatie door heel Nederland.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl',
  },
  icons: {
    icon: '/producten/faviconlogo2.png',
    shortcut: '/producten/faviconlogo2.png',
    apple: '/producten/faviconlogo2.png',
  },
  other: {
    'msapplication-TileColor': '#016B61',
    'theme-color': '#016B61',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        {/* Google tag (gtag.js) with Consent Mode v2 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Set default consent state to 'denied' for EER users (GDPR compliance)
              // This will be updated when user provides consent via cookie banner
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
              
              // Load Google Tag Manager script
              (function() {
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17774855917';
                document.head.appendChild(script);
              })();
              
              // Configure the tag after consent is set
              gtag('config', 'AW-17774855917', {
                'anonymize_ip': true
              });
            `,
          }}
        />
        
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ufp479nrsp");
            `,
          }}
        />
        
        {/* Viewport optimization for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Preconnect to font resources (highest priority) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://wa.me" />
        
        {/* Preload critical image with responsive sizes */}
        <link 
          rel="preload" 
          href="/herosection-4-optimized.webp" 
          as="image" 
          fetchPriority="high"
          media="(min-width: 768px)"
        />
        
        {/* Critical CSS for above-the-fold content - optimized for mobile first */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for fast initial render - Mobile First */
            *,::after,::before{box-sizing:border-box;margin:0;padding:0}
            html{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}
            body{margin:0;font-family:Nunito,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#1f2937}
            img,video,picture{max-width:100%;height:auto;display:block}
            button,input,select,textarea{font-family:inherit}
            h1,h2,h3,h4,h5,h6{font-weight:700;line-height:1.2}
            a{color:inherit;text-decoration:none}
            
            /* Essential layout utilities */
            .min-h-screen{min-height:100vh}
            .bg-white{background-color:#fff}
            .bg-gray-50{background-color:#f9fafb}
            .bg-gray-100{background-color:#f3f4f6}
            .bg-brand-dark{background-color:#016B61}
            .bg-brand-menu{background-color:#234C6A}
            .bg-brand-medium{background-color:#70B2B2}
            .bg-brand-light{background-color:#9ECFD4}
            .text-white{color:#fff}
            .text-black{color:#000}
            .text-gray-900{color:#111827}
            .text-gray-700{color:#374151}
            .text-gray-600{color:#4b5563}
            .text-brand-dark{color:#016B61}
            .border-gray-100{border-color:#f3f4f6}
            .border-gray-200{border-color:#e5e7eb}
            .border-gray-300{border-color:#d1d5db}
            .border-brand-light\\/30{border-color:rgba(158,207,212,0.3)}
            .font-bold{font-weight:700}
            .font-semibold{font-weight:600}
            .rounded-full{border-radius:9999px}
            .flex{display:flex}
            .inline-flex{display:inline-flex}
            .items-center{align-items:center}
            .justify-between{justify-content:space-between}
            .justify-center{justify-content:center}
            .gap-2{gap:0.5rem}
            .gap-4{gap:1rem}
            .gap-6{gap:1.5rem}
            .gap-8{gap:2rem}
            
            /* Mobile-first spacing */
            .p-2{padding:0.5rem}
            .p-3{padding:0.75rem}
            .p-4{padding:1rem}
            .px-3{padding-left:0.75rem;padding-right:0.75rem}
            .px-4{padding-left:1rem;padding-right:1rem}
            .px-6{padding-left:1.5rem;padding-right:1.5rem}
            .px-8{padding-left:2rem;padding-right:2rem}
            .py-2{padding-top:0.5rem;padding-bottom:0.5rem}
            .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
            .py-4{padding-top:1rem;padding-bottom:1rem}
            .py-8{padding-top:2rem;padding-bottom:2rem}
            .pl-8{padding-left:2rem}
            .mt-1{margin-top:0.25rem}
            .mt-2{margin-top:0.5rem}
            .mt-4{margin-top:1rem}
            .mb-4{margin-bottom:1rem}
            .mt-8{margin-top:2rem}
            .mb-8{margin-bottom:2rem}
            .ml-1{margin-left:0.25rem}
            
            /* Container */
            .container{width:100%;padding-left:1rem;padding-right:1rem;margin-left:auto;margin-right:auto}
            .max-w-7xl{max-width:80rem}
            .max-w-4xl{max-width:56rem}
            .max-w-lg{max-width:32rem}
            .max-w-sm{max-width:24rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .mx-8{margin-left:2rem;margin-right:2rem}
            .w-full{width:100%}
            .w-4{width:1rem}
            .w-5{width:1.25rem}
            .w-6{width:1.5rem}
            .w-4\\/5{width:80%}
            .h-4{height:1rem}
            .h-5{height:1.25rem}
            .h-6{height:1.5rem}
            .h-8{height:2rem}
            .h-auto{height:auto}
            .h-full{height:100%}
            .flex-1{flex:1 1 0%}
            .flex-shrink-0{flex-shrink:0}
            .space-x-2>:not([hidden])~:not([hidden]){margin-left:0.5rem}
            .space-x-6>:not([hidden])~:not([hidden]){margin-left:1.5rem}
            .space-x-8>:not([hidden])~:not([hidden]){margin-left:2rem}
            .space-y-1>:not([hidden])~:not([hidden]){margin-top:0.25rem}
            .space-y-2>:not([hidden])~:not([hidden]){margin-top:0.5rem}
            .whitespace-nowrap{white-space:nowrap}
            .cursor-pointer{cursor:pointer}
            .pointer-events-auto{pointer-events:auto}
            .border{border-width:1px}
            .border-b{border-bottom-width:1px}
            .border-t{border-top-width:1px}
            .opacity-0{opacity:0}
            .invisible{visibility:hidden}
            .visible{visibility:visible}
            .hover\\:bg-gray-50:hover{background-color:#f9fafb}
            .hover\\:bg-gray-100:hover{background-color:#f3f4f6}
            .focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}
            .focus\\:ring-2:focus{box-shadow:0 0 0 2px rgba(112,178,178,0.5)}
            .group:hover .group-hover\\:opacity-100{opacity:1}
            .group:hover .group-hover\\:visible{visibility:visible}
            
            /* Positioning */
            .relative{position:relative}
            .absolute{position:absolute}
            .fixed{position:fixed}
            .sticky{position:sticky}
            .top-0{top:0}
            .top-full{top:100%}
            .top-1\\/2{top:50%}
            .right-2{right:0.5rem}
            .left-0{left:0}
            .left-1\\/2{left:50%}
            .inset-0{inset:0}
            .z-10{z-index:10}
            .z-40{z-index:40}
            .z-50{z-index:50}
            .z-\\[9999\\]{z-index:9999}
            .-translate-x-1\\/2{transform:translateX(-50%)}
            .-translate-y-1\\/2{transform:translateY(-50%)}
            
            /* Display */
            .block{display:block}
            .hidden{display:none}
            .grid{display:grid}
            
            /* Overflow */
            .overflow-hidden{overflow:hidden}
            .overflow-x-hidden{overflow-x:hidden}
            .overflow-y-auto{overflow-y:auto}
            .max-h-96{max-height:24rem}
            .max-h-60{max-height:15rem}
            
            /* Border radius */
            .rounded{border-radius:0.25rem}
            .rounded-lg{border-radius:0.5rem}
            .rounded-xl{border-radius:0.75rem}
            .rounded-2xl{border-radius:1rem}
            .rounded-3xl{border-radius:1.5rem}
            
            /* Typography - Mobile */
            .text-xs{font-size:0.75rem;line-height:1rem}
            .text-sm{font-size:0.875rem;line-height:1.25rem}
            .text-base{font-size:1rem;line-height:1.5rem}
            .text-lg{font-size:1.125rem;line-height:1.75rem}
            .text-xl{font-size:1.25rem;line-height:1.75rem}
            .text-2xl{font-size:1.5rem;line-height:2rem}
            .text-3xl{font-size:1.875rem;line-height:2.25rem}
            .text-center{text-align:center}
            
            /* Button base */
            .btn{display:inline-flex;align-items:center;justify-content:center;padding:0.5rem 1rem;border-radius:0.5rem;font-weight:600;transition:all 0.15s ease-in-out;cursor:pointer;border:none}
            .btn:hover{transform:translateY(-1px);box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
            
            /* Shadows */
            .shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,0.1)}
            .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)}
            .shadow-xl{box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)}
            
            /* Transitions */
            .transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform;transition-duration:150ms}
            .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms}
            .transition-all{transition-property:all;transition-duration:150ms}
            .duration-200{transition-duration:200ms}
            .last\\:border-b-0:last-child{border-bottom-width:0}
            
            /* Tablet breakpoint (sm) */
            @media(min-width:640px){
              .sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}
              .sm\\:py-3{padding-top:0.75rem;padding-bottom:0.75rem}
              .sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}
              .sm\\:gap-6{gap:1.5rem}
              .sm\\:block{display:block}
              .sm\\:hidden{display:none}
              .sm\\:h-10{height:2.5rem}
              .sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}
              .sm\\:text-base{font-size:1rem}
            }
            
            /* Medium breakpoint (md) - tablets */
            @media(min-width:768px){
              .md\\:hidden{display:none}
              .md\\:block{display:block}
              .md\\:flex{display:flex}
            }
            
            /* Desktop breakpoint */
            @media(min-width:1024px){
              .lg\\:block{display:block}
              .lg\\:flex{display:flex}
              .lg\\:hidden{display:none}
              .lg\\:px-8{padding-left:2rem;padding-right:2rem}
              .lg\\:py-4{padding-top:1rem;padding-bottom:1rem}
              .lg\\:text-5xl{font-size:3rem;line-height:1}
              .lg\\:text-6xl{font-size:3.75rem;line-height:1}
              .lg\\:gap-8{gap:2rem}
              .lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
              .lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
              .lg\\:h-12{height:3rem}
            }
            
            /* Prevent layout shift */
            .aspect-video{aspect-ratio:16/9}
            .aspect-square{aspect-ratio:1/1}
            
            /* Loading state - prevents CLS */
            .loading{min-height:200px;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s ease-in-out infinite}
            @keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
            
            /* SVG utilities */
            svg{vertical-align:middle}
          `
        }} />
        
        {/* Load non-critical CSS asynchronously */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('loading' in HTMLLinkElement.prototype) {
              // Browser supports native async CSS loading
            } else {
              // Fallback for older browsers
              var links = document.getElementsByTagName('link');
              for (var i = 0; i < links.length; i++) {
                var link = links[i];
                if (link.rel === 'stylesheet' && link.media === 'print') {
                  link.media = 'all';
                }
              }
            }
          `
        }} />
      </head>
      <body className={nunito.className}>
        <CartProvider>
          <DashboardLayout>
            {children}
          </DashboardLayout>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}








