const DislikesController = require("./DislikesController")
// @ponicode
describe("DislikesController.store", () => {
    test("0", async () => {
        await DislikesController.store({ headers: { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Accept-Language: "en-US,en;q=0.5", Connection: "keep-alive", Upgrade-Insecure-Requests: 1, Pragma: "no-cache", Cache-Control: "no-cache" }, params: ["https://", "https://api.telegram.org/bot", "http://base.com"] }, { status: () => 500, json: () => "\"{\"x\":[10,null,null,null]}\"" })
    })

    test("1", async () => {
        await DislikesController.store({ headers: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", params: ["www.google.com", "https://croplands.org/app/a/confirm?t=", "https://api.telegram.org/bot"] }, { status: () => 400, json: () => "\"[3,\"false\",false]\"" })
    })

    test("2", async () => {
        await DislikesController.store({ headers: { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", Accept-Encoding: "gzip, deflate", Accept-Language: "en-GB,en-US;q=0.9,en;q=0.8", Dnt: 1, Host: "httpbin.org", Upgrade-Insecure-Requests: 1, User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" }, params: ["http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "https://api.telegram.org/", "Www.GooGle.com"] }, { status: () => 200, json: () => "\"[3,\"false\",false]\"" })
    })

    test("3", async () => {
        await DislikesController.store({ headers: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", params: ["https://api.telegram.org/bot", "http://www.croplands.org/account/confirm?t=", "www.google.com"] }, { status: () => 429, json: () => "\"{\"x\":[10,null,null,null]}\"" })
    })

    test("4", async () => {
        await DislikesController.store({ headers: { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" }, params: ["Www.GooGle.com", "http://www.example.com/route/123?foo=bar", "http://www.croplands.org/account/confirm?t="] }, { status: () => 200, json: () => "\"{\"x\":[10,null,null,null]}\"" })
    })

    test("5", async () => {
        await DislikesController.store({ headers: "", params: [] }, { status: () => Infinity, json: () => "" })
    })
})
