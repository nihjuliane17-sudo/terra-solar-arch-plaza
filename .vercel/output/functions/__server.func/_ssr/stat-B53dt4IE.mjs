import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as cn } from "./store-BFPkgcXL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stat-B53dt4IE.js
var import_jsx_runtime = require_jsx_runtime();
function Stat({ label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-1 font-display text-2xl tabular-nums tracking-tight", tone === "ok" && "text-ok", tone === "bad" && "text-destructive", tone === "warn" && "text-warn"),
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { Stat as t };
