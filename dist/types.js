"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BN = exports.DEFAULT_FUNCTION_CALL_GAS = exports.AccessKey = exports.fullAccessKey = exports.deleteAccount = exports.deleteKey = exports.addKey = exports.stake = exports.transfer = exports.functionCall = exports.deployContract = exports.createAccount = exports.Action = exports.PublicKey = exports.KeyPair = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
var near_api_js_1 = require("near-api-js");
Object.defineProperty(exports, "KeyPair", { enumerable: true, get: function () { return near_api_js_1.KeyPair; } });
var utils_1 = require("near-api-js/lib/utils");
Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function () { return utils_1.PublicKey; } });
var transaction_1 = require("near-api-js/lib/transaction");
Object.defineProperty(exports, "Action", { enumerable: true, get: function () { return transaction_1.Action; } });
Object.defineProperty(exports, "createAccount", { enumerable: true, get: function () { return transaction_1.createAccount; } });
Object.defineProperty(exports, "deployContract", { enumerable: true, get: function () { return transaction_1.deployContract; } });
Object.defineProperty(exports, "functionCall", { enumerable: true, get: function () { return transaction_1.functionCall; } });
Object.defineProperty(exports, "transfer", { enumerable: true, get: function () { return transaction_1.transfer; } });
Object.defineProperty(exports, "stake", { enumerable: true, get: function () { return transaction_1.stake; } });
Object.defineProperty(exports, "addKey", { enumerable: true, get: function () { return transaction_1.addKey; } });
Object.defineProperty(exports, "deleteKey", { enumerable: true, get: function () { return transaction_1.deleteKey; } });
Object.defineProperty(exports, "deleteAccount", { enumerable: true, get: function () { return transaction_1.deleteAccount; } });
Object.defineProperty(exports, "fullAccessKey", { enumerable: true, get: function () { return transaction_1.fullAccessKey; } });
Object.defineProperty(exports, "AccessKey", { enumerable: true, get: function () { return transaction_1.AccessKey; } });
var constants_1 = require("near-api-js/lib/constants");
Object.defineProperty(exports, "DEFAULT_FUNCTION_CALL_GAS", { enumerable: true, get: function () { return constants_1.DEFAULT_FUNCTION_CALL_GAS; } });
class BN extends bn_js_1.default {
    toJSON() {
        return this.toString(10);
    }
}
exports.BN = BN;
//# sourceMappingURL=types.js.map