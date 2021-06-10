"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var route_1 = __importDefault(require("./routes/route"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var ChatRoomController_1 = require("./controllers/ChatRoomController");
var socket = require('socket.io');
function envConfigFunction() {
    dotenv_1.default.config();
}
function ConnectToDB() {
    return __awaiter(this, void 0, void 0, function () {
        var conStr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conStr = "mongodb://localhost:27017/ChatApp";
                    // const conStr = "mongodb+srv://101yogeshsharma:Pcn2uRZa!qw983.@cluster0.idwtk.mongodb.net/Lookup?retryWrites=true&w=majority";
                    console.log("Initalizing connection with DB");
                    mongoose_1.default.connection.on("error", function (error) {
                        console.log("error in database " + error.message);
                    });
                    return [4 /*yield*/, mongoose_1.default.connect(conStr, {
                            useCreateIndex: true,
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false,
                        })];
                case 1:
                    _a.sent();
                    console.log("Connection initalized....");
                    return [2 /*return*/];
            }
        });
    });
}
function EnvirnmentSetup() {
    var server = express_1.default();
    server.use(cookie_parser_1.default());
    server.use(cors_1.default({ credentials: true, origin: 'http://localhost:3000' }));
    server.use(express_1.default.json());
    return server;
}
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var server, serverStart, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ConnectToDB()];
            case 1:
                _a.sent();
                return [4 /*yield*/, EnvirnmentSetup()];
            case 2:
                server = _a.sent();
                envConfigFunction();
                serverStart = server.listen(process.env.PORT);
                serverStart.on("error", function (error) {
                    console.log("server error", error.message);
                });
                io = socket(serverStart, { cors: { origin: ['http://localhost:3000'] } });
                io.on('connection', function (socket) {
                    // socket.owner="rajendra"
                    console.log('connected to socket..', socket.id);
                    socket.emit('setup', socket.id);
                    socket.on('setupChatroomOwner', function (details) {
                        socket.chatRoomOwner = details.Name;
                        socket.chatRoomOwnerId = details.id;
                    });
                    socket.on('send', function (data) {
                        // io.sockets.emit('chat',data.Newmessage)
                        console.log("reciver", data.reciever);
                        console.log("message", data.Newmessage);
                        ChatRoomController_1.storeMessage(data.Newmessage, socket.chatRoomOwnerId);
                        io.sockets.emit("" + data.reciever, data.Newmessage);
                    });
                });
                server.use(route_1.default);
                return [2 /*return*/];
        }
    });
}); };
var newServer = startServer()
    .then(function () { return console.log("server started on port " + process.env.PORT); })
    .catch(function (error) {
    console.log("error while starting of server " + error.message);
});
