#Giới thiệu
BCUber.Tier.Overlay 0.2 là userscript hiển thị badge tier, mũi tên nâng cấp và tooltip ghi chú cho các unit Uber trên trang bc.godfat.org. Bản này gộp dữ liệu từ bản cũ và bản 15.1, bổ sung collab và cải tiến cơ chế khớp tên bằng normalize để hiển thị chính xác cho tổng 326 unit. 
Tải release tại:
https://github.com/batcatmyman-cpu/The-Battle-Cats-Tierlist/releases/tag/Alpha  
File script: BCUber.Tier.Overlay0.2.js

#Cài đặt nhanh
Cài Tampermonkey trên trình duyệt (Chrome, Edge, Firefox).

Mở trang Tampermonkey → Create a new script.

Mở file BCUber.Tier.Overlay0.2.js từ release link, copy toàn bộ nội dung và dán vào editor Tampermonkey.

Lưu script và truy cập bc.godfat.org. Script sẽ tự động chèn badge lên trang.

Lưu ý: nếu bạn dùng userscript manager khác (Greasemonkey, Violentmonkey) các bước tương tự.

#Cấu hình và tùy chỉnh
Cập nhật dữ liệu tier  
Mặc định script lấy dữ liệu từ DATA_URL trong file. Nếu bạn muốn dùng file JSON riêng, mở script và sửa dòng:

js
const DATA_URL = "https://raw.githubusercontent.com/batcatmyman-cpu/The-Battle-Cats-Tierlist/main/uber_tiers.json";
thay bằng URL raw của file JSON bạn muốn.

Thay đổi màu badge  
Trong script có object tierColor. Bạn có thể chỉnh màu cho từng tier bằng cách sửa giá trị hex.

Bật tắt normalize  
Script có hàm normalizeName để loại tiền tố/hậu tố và chuẩn hóa dấu nháy. Nếu bạn muốn tắt, tìm hàm đó và thay name = normalizeName(rawName) bằng name = rawName.

Cách hoạt động tóm tắt
Script quét các thẻ td, a, span trên trang, lấy textContent và chuẩn hóa tên (bỏ tiền tố như Mighty, Radiant, Snow Angel, v.v., chuẩn hóa dấu nháy).

So khớp tên với key trong uber_tiers.json. Nếu tìm thấy, script chèn badge hiển thị tier, mũi tên nâng cấp nếu có trường upgrade, và tooltip nếu có note (ví dụ Need Talent, Need True Form).

Badge có màu theo tierColor để dễ phân biệt.

Khắc phục sự cố

Refresh trang và xóa cache trình duyệt.

Mở DevTools Console (F12) kiểm tra lỗi fetch JSON hoặc lỗi script.

Kiểm tra DATA_URL có đúng raw URL không và file JSON hợp lệ.

Nếu tên hiển thị trên trang có tiền tố/hậu tố lạ, đảm bảo normalizeName bao gồm tiền tố đó hoặc thêm alias vào JSON.

Badge hiển thị sai tier

Mở file JSON và kiểm tra key chính xác (chuẩn hóa dấu nháy và khoảng trắng).

Nếu unit có nhiều biến thể (True Form, Talent), thêm trường upgrade vào JSON để hiển thị mũi tên.

Hiệu năng chậm

Script chỉ chạy trên bc.godfat.org. Nếu trang có nhiều phần tử, script đã tối ưu cơ bản; bạn có thể giới hạn selector để chỉ quét danh sách unit cụ thể.
