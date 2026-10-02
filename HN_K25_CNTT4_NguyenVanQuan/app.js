let currentSeatCode = "";
let isSeatValid = false;
let totalRevenue = 0;
let totalTrips = 0;
let choice;
do {
  choice = prompt(`===========================================
    HỆ THỐNG BÁN VÉ NHÀ XE GREENLINEBUS
===========================================
1. Nhập và tìm kiếm chuẩn mã đặt chỗ
2. Tính tiền vé xe khách
3. Thẩm định mã vé xe may mắn
0. Thoát chương trình
===========================================
Vui lòng nhập lựa chọn của bạn (0-3):`);
  if (choice === null) {
    choice = "";
  }
  choice = choice.trim();
  switch (choice) {
    case "1": {
      currentSeatCode = "";
      isSeatValid = false;
      let rawInput = prompt("Nhập mã đặt chỗ: ");
      if (rawInput === null || rawInput.trim() === "") {
        console.log("Lỗi: Chưa nhập mã đặt chỗ");
        break;
      }
      let processCode = rawInput.trim().toUpperCase();
      if (processCode.length < 6) {
        console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
        break;
      }
      if (!processCode.startsWith("BUS-")) {
        console.log("Lỗi: Sai tiền tố 'BUS-'");
        break;
      }
      if (processCode.includes(" ")) {
        console.log("Lỗi: Chứa khoảng trắng ở giữa");
        break;
      }
      currentSeatCode = processCode;
      isSeatValid = true;
      console.log(`Thành công. Đã ghi nhận mã đặt chỗ ${currentSeatCode}`);
      break;
    }
    case "2": {
      if (!isSeatValid) {
        console.log(
          "Lỗi: Vui lòng nhập và kiểm chuẩn mã đặt chỗ chọn 1 để tiếp tục",
        );
        break;
      }
      let seatCount = 0;
      let pricePerSeat = 0;
      let isCancel = false;
      while (true) {
        let inputCount = prompt("Nhập số lượng ghế: ");
        if (inputCount === null) {
          isCancel = true;
          break;
        }
        seatCount = Number(inputCount);
        if (Number.isInteger(seatCount) && seatCount > 0) {
          break;
        }
        console.log("Lỗi: Số lượng ghế phải là số nguyên lớn hơn 0");
      }
      if (isCancel) {
        console.log("Đã hủy giao dịch mã đặt chỗ vẫn còn hiệu lực");
        break;
      }
      while (true) {
        let inputPrice = prompt("Nhập giá vé mới ghế: ");
        if (inputPrice === null) {
          isCancel = true;
          break;
        }
        pricePerSeat = Number(inputPrice);
        if (Number.isInteger(pricePerSeat) && pricePerSeat > 0) {
          break;
        }
        console.log("Lỗi: Gía vé phải là số nguyên và lớn hơn 0");
      }
      if (isCancel) {
        console.log("Đã hủy giao dịch mã đặt chỗ vẫn còn hiệu lực");
        break;
      }
      let baseCost = seatCount * pricePerSeat;
      let discount = 0;
      if (seatCount >= 4) {
        discount = Math.round(baseCost * 0.1);
      }
      let surcharge = Math.round((baseCost - discount) * 0.08);
      let totalPayment = baseCost - discount + surcharge;
      totalRevenue += totalPayment;
      totalTrips += 1;
      let finalCode = currentSeatCode;
      currentSeatCode = "";
      isSeatValid = false;
      console.log("--- HÓA ĐƠN VÉ XE ---");
      console.log(`Mã đặt chỗ: ${finalCode}`);
      console.log(`Số ghế: ${seatCount}`);
      console.log(
        `Gía vé mới ghế: ${pricePerSeat.toLocaleString("vi-VN")} VND`,
      );
      console.log(`Chi phí cơ sở: ${baseCost.toLocaleString("vi-VN")} VND`);
      console.log(`Tiền giảm giá: ${discount.toLocaleString("vi-VN")} VND`);
      console.log(
        `Phí dịch vụ trung chuyển: ${surcharge.toLocaleString("vi-VN")} VND`,
      );
      console.log(
        `Tổng thanh toán: ${totalPayment.toLocaleString("vi-VN")} VND`,
      );
      console.log("-----------------------");
      break;
    }
    case "3": {
      let recordCode = prompt("Nhập mã số in trên xe khách:");
      if (recordCode === null) {
        console.log("Đã hủy chức năng thẩm định");
        break;
      }
      recordCode = recordCode.trim();
      let isOnlyDigits = true;
      let isAllZeros = true;
      for (let i = 0; i < recordCode.length; i++) {
        let char = recordCode[i];
        if (char < "0" || char > "9") {
          isOnlyDigits = false;
        }
        if (char !== "0") {
          isAllZeros = false;
        }
      }
      if (!isOnlyDigits || recordCode.length < 2 || isAllZeros) {
        console.log(
          "Lỗi: Mã không hợp lệ chỉ gồm các ký tự 0-9 có từ 2 chữ số trở lên và không được toàn chữ số 0",
        );
        break;
      }
      let reversedCode = recordCode.split("").reverse().join("");
      let isPalindrome = recordCode === reversedCode;
      let digitSum = 0;
      for (let i = 0; i < recordCode.length; i++) {
        digitSum += Number(recordCode[i]);
      }
      let isDivisibleBy9 = digitSum % 9 === 0;
      let prize = "Không trúng thưởng";
      if (isPalindrome && isDivisibleBy9) {
        prize = "Giải đặc biệt (Vé khứ hồi miễn phí trị giá 600.000 VNĐ)";
      } else if (isPalindrome && !isDivisibleBy9) {
        prize = "Giải nhất (Nâng hạng ghế giường nằm VIP trị giá 150.000 VNĐ";
      } else if (!isPalindrome && isDivisibleBy9) {
        prize = "Giải nhì (Voucher giảm 20.000 VNĐ cho chuyến đi kế tiếp)";
      }
      console.log("--- KẾT QUẢ THẨM ĐỊNH MÃ MAY MẮN ---");
      console.log(`Mã số gốc: ${recordCode}`);
      console.log(`Mã đảo ngược: ${reversedCode}`);
      console.log(`Tổng chữ số: ${digitSum}`);
      console.log(`Chia hết cho 9: ${isDivisibleBy9 ? "Có" : "Không"}`);
      console.log(`Giải thương: ${prize}`);
      console.log("------------------------------------");
      break;
    }
    case "0": {
      console.log("=".repeat(50));
      console.log("BÁO CÁO TỔNG KẾT CA BÁN VÉ");
      console.log("=".repeat(50));
      if (totalTrips === 0) {
        console.log("Chưa có lượt đặt nào trong ca");
      } else {
        let averageRevenue = Math.round(totalRevenue / totalTrips);
        console.log(`Tổng số lượt đặt chỗ đã thanh toán: ${totalTrips}`);
        console.log(
          `Tổng doanh thu ca: ${totalRevenue.toLocaleString("vi-VN")} VND`,
        );
        console.log(
          `Doanh thu trung bình mỗi lượt: ${averageRevenue.toLocaleString("vi-VN")} VND`,
        );
      }
      console.log("=".repeat(50));
      console.log("Chào tạm biệt hẹn gặp lại <3");
      break;
    }
    default: {
      console.log("Lỗi: Lựa chọn không hợp lệ vui lòng nhập từ 0 đến 3");
      break;
    }
  }
} while (choice !== "0");
