module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},650645,a=>{a.n(a.i(827572))},43619,a=>{a.n(a.i(379962))},13718,a=>{a.n(a.i(685523))},118198,a=>{a.n(a.i(545518))},262212,a=>{a.n(a.i(866114))},587127,a=>{"use strict";function b(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)}var c={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},d={0:8203,1:8204,2:8205,3:65279};[,,,,].fill(String.fromCodePoint(d[0])).join(""),Object.fromEntries(Object.entries(d).map(a=>a.reverse())),Object.fromEntries(Object.entries(c).map(a=>a.reverse()));var e=`${Object.values(c).map(a=>`\\u{${a.toString(16)}}`).join("")}`,f=RegExp(`[${e}]{4,}`,"gu");function g(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(f,""),encoded:(null==(c=b.match(f))?void 0:c[0])||""}.cleaned)}a.s(["isRecord",()=>b,"stegaClean",()=>g])},497281,a=>{"use strict";let b=(0,a.i(181134).createClient)({projectId:"cnr6558t",dataset:"production",apiVersion:"2023-01-01",useCdn:!1});a.s(["client",0,b])},843167,a=>{"use strict";var b=a.i(181134),c=a.i(471593);let d=(0,b.createClient)({projectId:"cnr6558t",dataset:"production",apiVersion:"2024-01-01",useCdn:!1}),e=(0,c.default)(d);function f(a){return e.image(a)}a.s(["urlFor",()=>f])},557944,a=>{"use strict";function b(a,...c){let d=a.length-1;return a.slice(0,d).reduce((a,b,d)=>a+b+c[d],"")+a[d]}let c=b`
  *[_type == "homepage"][0] {
    heroHeadline,
    heroSubtext,
    backgroundImage,
    heroPrimaryButton,
    heroSecondaryButton,
    heroSmallLine,
    heroBackgroundImage,
    heroBackgroundImageAlt,
    quickActions,
    aboutHeadline,
    aboutContent,
    pastorMessage,
    aboutButton,
    servicesHeadline,
    location,
    locationLat,
    locationLng,
    serviceTimes,
    midweekService,
    servicesButton,
    servicesSmallLine,
    sermonHeadline,
    sermonIntro,
    sermonButton,
    sermonSecondaryButton,
    ministriesHeadline,
    ministriesIntro,
    ministries,
    ministriesButton,
    testimonialsHeadline,
    testimonials,
    testimonialsButton,
    globalHeadline,
    globalContent,
    globalButton,
    socialMedia,
    ctaHeadline,
    ctaText,
    ctaPrimaryButton,
    ctaSecondaryButton,
    footerColumns,
    footerContact,
    footerBottomText,
    prophetName,
    prophetTitle,
    prophetImage,
    firstLadyName,
    firstLadyTitle,
    firstLadyImage,
    leadersWelcomeMessage,
    whatToExpectTitle,
    whatToExpectItems[]{
      title,
      description,
      icon
    },
    globalCountries[]{
      name,
      flagImage,
      link
    }
  }
`;b`
  *[_type == "pastor"][0] {
    name,
    bio,
    photo,
    branch
  }
`;let d=b`
  *[_type == "pastor" && slug.current == $slug][0] {
    _id,
    name,
    bio,
    photo,
    slug,
    branch
  }
`;b`
  *[_type == "service" && branch == "ghana"] {
    title,
    description,
    day,
    time,
    image,
    branch
  }
`;let e=b`
  *[_type == "event" && branch == "ghana"] | order(date desc) {
    title,
    date,
    description,
    image,
    branch
  }
`;b`
  *[_type == "testimony" && branch == "ghana"] {
    name,
    message,
    branch
  }
`;let f=b`
  *[_type == "post" && branch == "ghana"] | order(publishedAt desc) {
    title,
    slug,
    content,
    publishedAt,
    image,
    branch
  }
`,g=b`
  *[_type == "sermon" && branch == "ghana"] | order(date desc) {
    title,
    slug,
    preacher->{
      name
    },
    date,
    videoUrl,
    audioUrl,
    series,
    scriptureReferences,
    keyPoints,
    notesUrl,
    branch
  }
`;a.s(["eventsQuery",0,e,"homepageQuery",0,c,"postsQuery",0,f,"preacherQuery",0,d,"sermonsQuery",0,g],557944)},164240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},500790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(211857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},784707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(211857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},297647,a=>{"use strict";a.i(500790);var b=a.i(784707);a.n(b)},395936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(164240),g=a.r(907997),h=f._(a.r(297647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},256643,a=>{"use strict";var b=a.i(907997),c=a.i(497281),d=a.i(557944),e=a.i(843167),f=a.i(395936);async function g(){let a=await c.client.fetch(d.postsQuery,{},{next:{revalidate:60}})||[];return(0,b.jsx)("div",{className:"min-h-screen bg-background text-foreground",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 py-16",children:[(0,b.jsx)("h1",{className:"text-3xl md:text-4xl font-bold text-center mb-8",children:"Blog"}),(0,b.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:a.map(a=>(0,b.jsxs)("div",{className:"bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow",children:[a.image&&(0,b.jsx)("img",{src:(0,e.urlFor)(a.image).url(),alt:a.title,className:"w-full h-48 object-cover mb-4 rounded"}),(0,b.jsx)(f.default,{href:`/blog/${a.slug.current}`,children:(0,b.jsx)("h2",{className:"text-xl font-semibold mb-2 hover:text-purple-500 cursor-pointer",children:a.title})}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground mb-4",children:new Date(a.publishedAt).toLocaleDateString()})]},a.slug.current))})]})})}a.s(["default",()=>g,"revalidate",0,60])},609489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_e91a1003.js"].map(b=>a.l(b))).then(()=>b(614025)))},276016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__67ed145b._.js"].map(b=>a.l(b))).then(()=>b(312374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__bee14fcd._.js.map