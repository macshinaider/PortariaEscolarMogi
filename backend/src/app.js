"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var http_1 = require("http");
var routes_1 = __importDefault(require("./routes"));
var swagger_json_1 = __importDefault(require("./swagger.json"));
var body_parser_1 = __importDefault(require("body-parser"));
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.server = (0, http_1.createServer)(this.app);
        this.app.use(routes_1.default);
        // configureSocket(this.server);
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    return App;
}());
exports.App = App;
