module.exports = {
  localBasePath: "/",
  remoteBasePath: "/",
  del: ["/css", "/js", "/img", "/fonts"],
  // clear: ["/public_html/css", { dir: "/public_html/css", test: "*.css" }],
  clear: [{ dir: "/", test: "index.html" }, { dir: "/", test: "style.css" }],
  sync: [
    { src: "/dist", dest: "/" }
  ]
};
