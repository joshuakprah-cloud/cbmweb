module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},650645,a=>{a.n(a.i(827572))},43619,a=>{a.n(a.i(379962))},13718,a=>{a.n(a.i(685523))},118198,a=>{a.n(a.i(545518))},262212,a=>{a.n(a.i(866114))},587127,a=>{"use strict";function b(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)}var c={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},d={0:8203,1:8204,2:8205,3:65279};[,,,,].fill(String.fromCodePoint(d[0])).join(""),Object.fromEntries(Object.entries(d).map(a=>a.reverse())),Object.fromEntries(Object.entries(c).map(a=>a.reverse()));var e=`${Object.values(c).map(a=>`\\u{${a.toString(16)}}`).join("")}`,f=RegExp(`[${e}]{4,}`,"gu");function g(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(f,""),encoded:(null==(c=b.match(f))?void 0:c[0])||""}.cleaned)}a.s(["isRecord",()=>b,"stegaClean",()=>g])},497281,a=>{"use strict";let b=(0,a.i(181134).createClient)({projectId:"cnr6558t",dataset:"production",apiVersion:"2023-01-01",useCdn:!1});a.s(["client",0,b])},557944,a=>{"use strict";function b(a,...c){let d=a.length-1;return a.slice(0,d).reduce((a,b,d)=>a+b+c[d],"")+a[d]}let c=b`
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
`;a.s(["homepageQuery",0,c,"postsQuery",0,e,"preacherQuery",0,d,"sermonsQuery",0,f],557944)},492668,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/SermonsClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/SermonsClient.tsx <module evaluation>","default")},306646,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/SermonsClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/SermonsClient.tsx","default")},300004,a=>{"use strict";a.i(492668);var b=a.i(306646);a.n(b)},742274,a=>{"use strict";var b=a.i(907997),c=a.i(497281),d=a.i(557944),e=a.i(300004);async function f(){let a=await c.client.fetch(d.sermonsQuery,{},{next:{revalidate:60}});return(0,b.jsx)(e.default,{initialSermons:a})}a.s(["default",()=>f,"revalidate",0,60])},609489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_e91a1003.js"].map(b=>a.l(b))).then(()=>b(614025)))},276016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__67ed145b._.js"].map(b=>a.l(b))).then(()=>b(312374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__91680239._.js.map