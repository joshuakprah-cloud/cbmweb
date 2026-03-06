module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},650645,a=>{a.n(a.i(827572))},43619,a=>{a.n(a.i(379962))},13718,a=>{a.n(a.i(685523))},118198,a=>{a.n(a.i(545518))},262212,a=>{a.n(a.i(866114))},79900,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/Footer.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/Footer.tsx <module evaluation>","default")},333139,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/Footer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/Footer.tsx","default")},495774,a=>{"use strict";a.i(79900);var b=a.i(333139);a.n(b)},14299,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/navbar/Navbar.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/navbar/Navbar.tsx <module evaluation>","default")},448909,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/navbar/Navbar.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/navbar/Navbar.tsx","default")},213557,a=>{"use strict";a.i(14299);var b=a.i(448909);a.n(b)},587127,a=>{"use strict";function b(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)}var c={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},d={0:8203,1:8204,2:8205,3:65279};[,,,,].fill(String.fromCodePoint(d[0])).join(""),Object.fromEntries(Object.entries(d).map(a=>a.reverse())),Object.fromEntries(Object.entries(c).map(a=>a.reverse()));var e=`${Object.values(c).map(a=>`\\u{${a.toString(16)}}`).join("")}`,f=RegExp(`[${e}]{4,}`,"gu");function g(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(f,""),encoded:(null==(c=b.match(f))?void 0:c[0])||""}.cleaned)}a.s(["isRecord",()=>b,"stegaClean",()=>g])},497281,a=>{"use strict";let b=(0,a.i(181134).createClient)({projectId:"cnr6558t",dataset:"production",apiVersion:"2023-01-01",useCdn:!0});a.s(["client",0,b])},843167,a=>{"use strict";var b=a.i(181134),c=a.i(471593);let d=(0,b.createClient)({projectId:"cnr6558t",dataset:"production",apiVersion:"2024-01-01",useCdn:!1}),e=(0,c.default)(d);function f(a){return e.image(a)}a.s(["urlFor",()=>f])},557944,a=>{"use strict";function b(a,...c){let d=a.length-1;return a.slice(0,d).reduce((a,b,d)=>a+b+c[d],"")+a[d]}let c=b`
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
    footerBottomText
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
`,b`
  *[_type == "event" && branch == "ghana"] | order(date desc) {
    title,
    date,
    description,
    image,
    branch
  }
`,b`
  *[_type == "testimony" && branch == "ghana"] {
    name,
    message,
    branch
  }
`;let e=b`
  *[_type == "post" && branch == "ghana"] | order(publishedAt desc) {
    title,
    slug,
    content,
    publishedAt,
    image,
    branch
  }
`,f=b`
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
`;a.s(["homepageQuery",0,c,"postsQuery",0,e,"preacherQuery",0,d,"sermonsQuery",0,f],557944)},371029,(a,b,c)=>{"use strict";c._=function(a){return a&&a.__esModule?a:{default:a}}},116426,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"warnOnce",{enumerable:!0,get:function(){return d}});let d=a=>{}},229945,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={getDeploymentId:function(){return f},getDeploymentIdQueryOrEmptyString:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(){return!1}function g(){return""}},301359,(a,b,c)=>{"use strict";function d({widthInt:a,heightInt:b,blurWidth:c,blurHeight:d,blurDataURL:e,objectFit:f}){let g=c?40*c:a,h=d?40*d:b,i=g&&h?`viewBox='0 0 ${g} ${h}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${i}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${i?"none":"contain"===f?"xMidYMid":"cover"===f?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${e}'/%3E%3C/svg%3E`}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImageBlurSvg",{enumerable:!0,get:function(){return d}})},853549,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={VALID_LOADERS:function(){return f},imageConfigDefault:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=["default","imgix","cloudinary","akamai","custom"],g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},487713,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImgProps",{enumerable:!0,get:function(){return j}}),a.r(116426);let d=a.r(229945),e=a.r(301359),f=a.r(853549),g=["-moz-initial","fill","none","scale-down",void 0];function h(a){return void 0!==a.default}function i(a){return void 0===a?a:"number"==typeof a?Number.isFinite(a)?a:NaN:"string"==typeof a&&/^[0-9]+$/.test(a)?parseInt(a,10):NaN}function j({src:a,sizes:b,unoptimized:c=!1,priority:j=!1,preload:k=!1,loading:l,className:m,quality:n,width:o,height:p,fill:q=!1,style:r,overrideSrc:s,onLoad:t,onLoadingComplete:u,placeholder:v="empty",blurDataURL:w,fetchPriority:x,decoding:y="async",layout:z,objectFit:A,objectPosition:B,lazyBoundary:C,lazyRoot:D,...E},F){var G;let H,I,J,{imgConf:K,showAltText:L,blurComplete:M,defaultLoader:N}=F,O=K||f.imageConfigDefault;if("allSizes"in O)H=O;else{let a=[...O.deviceSizes,...O.imageSizes].sort((a,b)=>a-b),b=O.deviceSizes.sort((a,b)=>a-b),c=O.qualities?.sort((a,b)=>a-b);H={...O,allSizes:a,deviceSizes:b,qualities:c}}if(void 0===N)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let P=E.loader||N;delete E.loader,delete E.srcSet;let Q="__next_img_default"in P;if(Q){if("custom"===H.loader)throw Object.defineProperty(Error(`Image with src "${a}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let a=P;P=b=>{let{config:c,...d}=b;return a(d)}}if(z){"fill"===z&&(q=!0);let a={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[z];a&&(r={...r,...a});let c={responsive:"100vw",fill:"100vw"}[z];c&&!b&&(b=c)}let R="",S=i(o),T=i(p);if((G=a)&&"object"==typeof G&&(h(G)||void 0!==G.src)){let b=h(a)?a.default:a;if(!b.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!b.height||!b.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(I=b.blurWidth,J=b.blurHeight,w=w||b.blurDataURL,R=b.src,!q)if(S||T){if(S&&!T){let a=S/b.width;T=Math.round(b.height*a)}else if(!S&&T){let a=T/b.height;S=Math.round(b.width*a)}}else S=b.width,T=b.height}let U=!j&&!k&&("lazy"===l||void 0===l);(!(a="string"==typeof a?a:R)||a.startsWith("data:")||a.startsWith("blob:"))&&(c=!0,U=!1),H.unoptimized&&(c=!0),Q&&!H.dangerouslyAllowSVG&&a.split("?",1)[0].endsWith(".svg")&&(c=!0);let V=i(n),W=Object.assign(q?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:A,objectPosition:B}:{},L?{}:{color:"transparent"},r),X=M||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,e.getImageBlurSvg)({widthInt:S,heightInt:T,blurWidth:I,blurHeight:J,blurDataURL:w||"",objectFit:W.objectFit})}")`:`url("${v}")`,Y=g.includes(W.objectFit)?"fill"===W.objectFit?"100% 100%":"cover":W.objectFit,Z=X?{backgroundSize:Y,backgroundPosition:W.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},$=function({config:a,src:b,unoptimized:c,width:e,quality:f,sizes:g,loader:h}){if(c){let a=(0,d.getDeploymentId)();if(b.startsWith("/")&&!b.startsWith("//")&&a){let c=b.includes("?")?"&":"?";b=`${b}${c}dpl=${a}`}return{src:b,srcSet:void 0,sizes:void 0}}let{widths:i,kind:j}=function({deviceSizes:a,allSizes:b},c,d){if(d){let c=/(^|\s)(1?\d?\d)vw/g,e=[];for(let a;a=c.exec(d);)e.push(parseInt(a[2]));if(e.length){let c=.01*Math.min(...e);return{widths:b.filter(b=>b>=a[0]*c),kind:"w"}}return{widths:b,kind:"w"}}return"number"!=typeof c?{widths:a,kind:"w"}:{widths:[...new Set([c,2*c].map(a=>b.find(b=>b>=a)||b[b.length-1]))],kind:"x"}}(a,e,g),k=i.length-1;return{sizes:g||"w"!==j?g:"100vw",srcSet:i.map((c,d)=>`${h({config:a,src:b,quality:f,width:c})} ${"w"===j?c:d+1}${j}`).join(", "),src:h({config:a,src:b,quality:f,width:i[k]})}}({config:H,src:a,unoptimized:c,width:S,quality:V,sizes:b,loader:P}),_=U?"lazy":l;return{props:{...E,loading:_,fetchPriority:x,width:S,height:T,decoding:y,className:m,style:{...W,...Z},sizes:$.sizes,srcSet:$.srcSet,src:s||$.src},meta:{unoptimized:c,preload:k||j,placeholder:v,fill:q}}}},442377,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(211857);a.n(d("[project]/node_modules/next/dist/client/image-component.js <module evaluation>"))},843489,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(211857);a.n(d("[project]/node_modules/next/dist/client/image-component.js"))},418409,a=>{"use strict";a.i(442377);var b=a.i(843489);a.n(b)},353200,(a,b,c)=>{"use strict";function d(a,b){let c=a||75;return b?.qualities?.length?b.qualities.reduce((a,b)=>Math.abs(b-c)<Math.abs(a-c)?b:a,0):c}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"findClosestQuality",{enumerable:!0,get:function(){return d}})},37763,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return g}});let d=a.r(353200),e=a.r(229945);function f({config:a,src:b,width:c,quality:f}){if(b.startsWith("/")&&b.includes("?")&&a.localPatterns?.length===1&&"**"===a.localPatterns[0].pathname&&""===a.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${b}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let g=(0,d.findClosestQuality)(f,a),h=(0,e.getDeploymentId)();return`${a.path}?url=${encodeURIComponent(b)}&w=${c}&q=${g}${b.startsWith("/")&&h?`&dpl=${h}`:""}`}f.__next_img_default=!0;let g=f},250858,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return k},getImageProps:function(){return j}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(371029),g=a.r(487713),h=a.r(418409),i=f._(a.r(37763));function j(a){let{props:b}=(0,g.getImgProps)(a,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[a,c]of Object.entries(b))void 0===c&&delete b[a];return{props:b}}let k=h.Image},503236,(a,b,c)=>{b.exports=a.r(250858)},160168,a=>{"use strict";var b=a.i(907997),c=a.i(213557),d=a.i(843167),e=a.i(503236);let f=({heroHeadline:a,heroSubtext:c,heroBackgroundImage:f,heroBackgroundImageAlt:g,heroPrimaryButton:h,heroSecondaryButton:i,heroSmallLine:j})=>(0,b.jsxs)("section",{className:"relative h-screen flex items-center justify-center overflow-hidden",children:[(0,b.jsx)(e.default,{src:f?(0,d.urlFor)(f).url():"/fallback-hero.jpg",alt:g||"ThaGospel Church hero background",fill:!0,className:"object-cover",priority:!0}),(0,b.jsx)("div",{className:"absolute inset-0 bg-black bg-opacity-70"}),(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"}),(0,b.jsxs)("div",{className:"text-center text-white z-10 px-4 max-w-4xl mx-auto",children:[(0,b.jsx)("h1",{className:"text-3xl md:text-5xl lg:text-6xl font-bold mb-2 font-inter leading-tight"}),(0,b.jsx)("p",{className:"text-lg md:text-xl mb-6 font-inter"}),(0,b.jsxs)("div",{className:"mb-8 text-sm md:text-base",children:[(0,b.jsxs)("p",{className:"mb-2",children:[(0,b.jsx)("strong",{})," "]}),(0,b.jsxs)("p",{className:"mb-2",children:[(0,b.jsx)("strong",{})," "]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{})," "]})]}),(0,b.jsxs)("div",{className:"flex flex-row items-center justify-center space-x-4",children:[(0,b.jsx)("button",{className:"bg-red-600 text-white px-6 py-3 rounded-lg font-inter font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"}),(0,b.jsx)("button",{className:"bg-white text-gray-900 px-6 py-3 rounded-lg font-inter font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"})]})]})]}),g=()=>(0,b.jsx)("section",{className:"py-16 bg-background",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4",children:[(0,b.jsx)("h2",{className:"text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground"}),(0,b.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[].map((a,c)=>(0,b.jsxs)("div",{className:"text-center",children:[(0,b.jsx)("h3",{className:"text-xl font-semibold mb-4 font-inter text-foreground",children:a.title}),(0,b.jsx)("p",{className:"text-muted-foreground leading-relaxed",children:a.description})]},c))})]})}),h=()=>(0,b.jsx)("section",{className:"py-16 bg-muted",children:(0,b.jsxs)("div",{className:"max-w-4xl mx-auto px-4",children:[(0,b.jsx)("h2",{className:"text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground"}),(0,b.jsx)("div",{className:"bg-background rounded-lg shadow-lg overflow-hidden",children:(0,b.jsxs)("div",{className:"md:flex",children:[(0,b.jsx)("div",{className:"md:w-1/3",children:(0,b.jsx)("img",{src:"",alt:"",className:"w-full h-48 md:h-full object-cover"})}),(0,b.jsxs)("div",{className:"md:w-2/3 p-8",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold mb-2 font-inter text-foreground",children:""}),(0,b.jsx)("p",{className:"text-muted-foreground mb-4",children:""}),(0,b.jsx)("p",{className:"text-foreground mb-6 leading-relaxed",children:""}),(0,b.jsx)("button",{className:"bg-red-600 text-white px-6 py-3 rounded-lg font-inter hover:bg-red-700 transition-colors",children:""})]})]})})]})}),i=()=>(0,b.jsx)("section",{className:"py-16 bg-background",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4",children:[(0,b.jsx)("h2",{className:"text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground"}),(0,b.jsxs)("div",{className:"md:flex items-center",children:[(0,b.jsx)("div",{className:"md:w-1/2 mb-8 md:mb-0",children:(0,b.jsx)("img",{src:"/placeholder-pastor.jpg",alt:"Lead Pastor",className:"w-full h-96 object-cover rounded-lg shadow-lg"})}),(0,b.jsxs)("div",{className:"md:w-1/2 md:pl-12",children:[(0,b.jsx)("p",{className:"text-lg text-foreground leading-relaxed mb-4"}),(0,b.jsx)("p",{className:"text-lg text-foreground leading-relaxed mb-4"}),(0,b.jsx)("p",{className:"text-lg text-foreground leading-relaxed"})]})]})]})});var j=a.i(495774),k=a.i(497281),l=a.i(557944);async function m(){let a=await k.client.fetch(l.homepageQuery,{},{next:{revalidate:60}});return(0,b.jsxs)("div",{className:"min-h-screen bg-background text-foreground",children:[(0,b.jsx)(c.default,{}),(0,b.jsx)(f,{heroHeadline:a?.heroHeadline,heroSubtext:a?.heroSubtext,heroBackgroundImage:a?.heroBackgroundImage,heroBackgroundImageAlt:a?.heroBackgroundImageAlt,heroPrimaryButton:a?.heroPrimaryButton,heroSecondaryButton:a?.heroSecondaryButton,heroSmallLine:a?.heroSmallLine}),(0,b.jsx)(g,{}),(0,b.jsx)(h,{}),(0,b.jsx)(i,{}),(0,b.jsx)(j.default,{})]})}a.s(["default",()=>m,"dynamic",0,"force-dynamic","revalidate",0,60],160168)},609489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_e91a1003.js"].map(b=>a.l(b))).then(()=>b(614025)))},276016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__67ed145b._.js"].map(b=>a.l(b))).then(()=>b(312374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__e6633ede._.js.map