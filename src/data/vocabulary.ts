import type { RawLesson, Word } from '../types';

export const rawLessonsData: RawLesson[] = [
  {
    lessonId: 1,
    lessonTitle: 'Hand & Foot',
    words: [
      {
        en: 'Drive',
        pos: 'v',
        ipa: '/draɪv/',
        vi: 'Lái xe (ô tô, xe tải)',
        example: {
          en: 'He drives to the company headquarters every morning.',
          vi: 'Anh ấy lái xe đến trụ sở công ty mỗi sáng.',
        },
      },
      {
        en: 'Turn on/off',
        pos: 'v',
        ipa: '/tɜːrn ɒn / ɒf/',
        vi: 'Bật/tắt',
        example: {
          en: 'Remember to turn off the lights before leaving the office.',
          vi: 'Hãy nhớ tắt đèn trước khi rời văn phòng.',
        },
      },
      {
        en: 'Arrange',
        pos: 'v',
        ipa: '/əˈreɪndʒ/',
        vi: 'Sắp xếp',
        example: {
          en: 'The secretary arranged an urgent meeting with the client.',
          vi: 'Thư ký đã sắp xếp một cuộc họp khẩn với khách hàng.',
        },
      },
      {
        en: 'Stack',
        pos: 'v',
        ipa: '/stæk/',
        vi: 'Xếp chồng',
        example: {
          en: 'Workers are stacking shipping boxes in the warehouse.',
          vi: 'Các công nhân đang xếp chồng các thùng hàng trong kho.',
        },
      },
      {
        en: 'Pile up',
        pos: 'v',
        ipa: '/paɪl ʌp/',
        vi: 'Xếp thành chồng, đống',
        example: {
          en: 'Invoices were beginning to pile up on his desk.',
          vi: 'Các hóa đơn bắt đầu chất đống trên bàn làm việc của anh ấy.',
        },
      },
      {
        en: 'Pave',
        pos: 'v',
        ipa: '/peɪv/',
        vi: 'Lát (đường, sàn...)',
        example: {
          en: 'The city decided to pave the pedestrian walkway with stone.',
          vi: 'Thành phố đã quyết định lát lối đi bộ bằng đá.',
        },
      },
      {
        en: 'Cut = trim',
        pos: 'v',
        ipa: '/kʌt = trɪm/',
        vi: 'Cắt, tỉa',
        example: {
          en: 'The gardener is trimming the bushes outside the lobby.',
          vi: 'Người làm vườn đang cắt tỉa các bụi cây bên ngoài sảnh.',
        },
      },
      {
        en: 'Repair = fix',
        pos: 'v',
        ipa: '/rɪˈpeər = fɪks/',
        vi: 'Sửa chữa',
        example: {
          en: 'A technician came to repair the malfunctioning copier.',
          vi: 'Một kỹ thuật viên đã đến để sửa chữa máy photocopy bị hỏng.',
        },
      },
      {
        en: 'Wipe',
        pos: 'v',
        ipa: '/waɪp/',
        vi: 'Lau chùi',
        example: {
          en: 'She wiped the conference table with a clean cloth.',
          vi: 'Cô ấy lau bàn họp bằng một chiếc khăn sạch.',
        },
      },
      {
        en: 'Sweep',
        pos: 'v',
        ipa: '/swiːp/',
        vi: 'Quét',
        example: {
          en: 'The maintenance staff sweeps the entrance every morning.',
          vi: 'Nhân viên bảo trì quét lối vào mỗi buổi sáng.',
        },
      },
      {
        en: 'Adjust',
        pos: 'v',
        ipa: '/əˈdʒʌst/',
        vi: 'Điều chỉnh',
        example: {
          en: 'He adjusted his office chair to sit more comfortably.',
          vi: 'Anh ấy điều chỉnh ghế làm việc để ngồi thoải mái hơn.',
        },
      },
      {
        en: 'Put down',
        pos: 'v',
        ipa: '/pʊt daʊn/',
        vi: 'Đặt xuống',
        example: {
          en: 'Please put down your pens when time is announced.',
          vi: 'Vui lòng đặt bút xuống khi có thông báo hết giờ.',
        },
      },
      {
        en: 'Tie up',
        pos: 'v',
        ipa: '/taɪ ʌp/',
        vi: 'Cột, buộc',
        example: {
          en: 'The documents were tied up securely before shipping.',
          vi: 'Các tài liệu đã được buộc chắc chắn trước khi vận chuyển.',
        },
      },
      {
        en: 'Tow',
        pos: 'v',
        ipa: '/təʊ/',
        vi: 'Kéo đi',
        example: {
          en: 'The delivery van broke down and had to be towed away.',
          vi: 'Chiếc xe tải giao hàng bị hỏng và phải được kéo đi.',
        },
      },
      {
        en: 'Pick up',
        pos: 'v',
        ipa: '/pɪk ʌp/',
        vi: 'Nhặt lên, đón',
        example: {
          en: 'Could you pick up the parcels from the front desk?',
          vi: 'Bạn có thể lấy các kiện hàng từ bàn lễ tân được không?',
        },
      },
      {
        en: 'Pour',
        pos: 'v',
        ipa: '/pɔːr/',
        vi: 'Rót nước',
        example: {
          en: 'She poured coffee for everyone attending the board meeting.',
          vi: 'Cô ấy rót cà phê cho mọi người tham dự cuộc họp hội đồng.',
        },
      },
      {
        en: 'Type',
        pos: 'v',
        ipa: '/taɪp/',
        vi: 'Đánh máy',
        example: {
          en: 'The assistant is typing a formal response to the inquiry.',
          vi: 'Trợ lý đang đánh máy thư trả lời chính thức cho yêu cầu.',
        },
      },
      {
        en: 'Write',
        pos: 'v',
        ipa: '/raɪt/',
        vi: 'Viết',
        example: {
          en: 'The manager will write a performance review for each team member.',
          vi: 'Quản lý sẽ viết đánh giá hiệu quả cho từng thành viên trong nhóm.',
        },
      },
      {
        en: 'Stir',
        pos: 'v',
        ipa: '/stɜːr/',
        vi: 'Khuấy',
        example: {
          en: 'He stirred sugar into his tea before drinking.',
          vi: 'Anh ấy khuấy đường vào trà trước khi uống.',
        },
      },
      {
        en: 'Hand',
        pos: 'v',
        ipa: '/hænd/',
        vi: 'Đưa, trao tay',
        example: {
          en: 'Please hand these promotional flyers to the participants.',
          vi: 'Vui lòng đưa các tờ rơi quảng bá này cho người tham gia.',
        },
      },
      {
        en: "Fold smb's arms",
        pos: 'v',
        ipa: '/fəʊld ɑːmz/',
        vi: 'Khoanh tay',
        example: {
          en: 'He folded his arms and listened attentively to the keynote speech.',
          vi: 'Anh ấy khoanh tay và chăm chú lắng nghe bài diễn thuyết.',
        },
      },
      {
        en: 'Hold',
        pos: 'v',
        ipa: '/həʊld/',
        vi: 'Nắm, giữ, cầm',
        example: {
          en: 'The presenter was holding a remote clicker in his hand.',
          vi: 'Người thuyết trình đang cầm chiếc bấm chuyển trang trên tay.',
        },
      },
      {
        en: 'Pull',
        pos: 'v',
        ipa: '/pʊl/',
        vi: 'Kéo',
        example: {
          en: 'Pull the handle firmly to open the emergency exit.',
          vi: 'Kéo mạnh tay nắm để mở lối thoát hiểm.',
        },
      },
      {
        en: 'Push',
        pos: 'v',
        ipa: '/pʊʃ/',
        vi: 'Đẩy',
        example: {
          en: 'He pushed the mail cart along the office corridor.',
          vi: 'Anh ấy đẩy xe thư tín dọc hành lang văn phòng.',
        },
      },
      {
        en: 'Carry',
        pos: 'v',
        ipa: '/ˈkæri/',
        vi: 'Cầm, vác',
        example: {
          en: 'The courier carried the heavy delivery box into the lobby.',
          vi: 'Người chuyển phát đã mang thùng hàng nặng vào trong sảnh.',
        },
      },
      {
        en: 'Grab',
        pos: 'v',
        ipa: '/ɡræb/',
        vi: 'Nắm, chộp lấy',
        example: {
          en: 'She grabbed her briefcase and rushed out to catch the bus.',
          vi: 'Cô ấy chộp lấy chiếc cặp và vội vã ra ngoài để bắt xe buýt.',
        },
      },
      {
        en: 'Catch',
        pos: 'v',
        ipa: '/kætʃ/',
        vi: 'Bắt lấy, đón xe',
        example: {
          en: 'We need to leave early to catch the express train to Kyoto.',
          vi: 'Chúng ta cần đi sớm để đón chuyến tàu tốc hành đi Kyoto.',
        },
      },
      {
        en: 'Touch',
        pos: 'v',
        ipa: '/tʌtʃ/',
        vi: 'Chạm',
        example: {
          en: 'Please do not touch the delicate museum exhibits.',
          vi: 'Xin vui lòng không chạm vào các hiện vật triển lãm dễ vỡ.',
        },
      },
      {
        en: 'Press',
        pos: 'v',
        ipa: '/pres/',
        vi: 'Nhấn',
        example: {
          en: 'Press the green button to start the photocopy machine.',
          vi: 'Nhấn nút màu xanh lá cây để bắt đầu máy photocopy.',
        },
      },
      {
        en: 'Clap',
        pos: 'v',
        ipa: '/klæp/',
        vi: 'Vỗ tay',
        example: {
          en: 'The audience clapped enthusiastically after the presentation.',
          vi: 'Khán giả vỗ tay nhiệt liệt sau bài thuyết trình.',
        },
      },
      {
        en: 'Shake hands',
        pos: 'v',
        ipa: '/ʃeɪk hændz/',
        vi: 'Bắt tay',
        example: {
          en: 'The executives shook hands after signing the strategic contract.',
          vi: 'Các giám đốc điều hành đã bắt tay nhau sau khi ký hợp đồng chiến lược.',
        },
      },
      {
        en: 'Point',
        pos: 'v',
        ipa: '/pɔɪnt/',
        vi: 'Chỉ, trỏ',
        example: {
          en: 'The speaker pointed to the chart showing quarterly revenue growth.',
          vi: 'Diễn giả đã chỉ vào biểu đồ thể hiện sự tăng trưởng doanh thu quý.',
        },
      },
      {
        en: 'Reach',
        pos: 'v',
        ipa: '/riːtʃ/',
        vi: 'Vươn tới, đạt tới',
        example: {
          en: 'She reached for the reference book on the upper shelf.',
          vi: 'Cô ấy với lấy cuốn sách tham khảo trên giá sách phía trên.',
        },
      },
      {
        en: 'Wash',
        pos: 'v',
        ipa: '/wɒʃ/',
        vi: 'Rửa',
        example: {
          en: 'Cafeteria employees must wash their hands before handling food.',
          vi: 'Nhân viên nhà ăn phải rửa tay trước khi chế biến thức ăn.',
        },
      },
      {
        en: 'Ride',
        pos: 'v',
        ipa: '/raɪd/',
        vi: 'Lái xe (xe đạp, xe máy), đi xe',
        example: {
          en: 'Many downtown workers ride bicycles to avoid traffic congestion.',
          vi: 'Nhiều nhân viên văn phòng đi xe đạp để tránh ùn tắc giao thông.',
        },
      },
      {
        en: 'Stand',
        pos: 'v',
        ipa: '/stænd/',
        vi: 'Đứng',
        example: {
          en: 'Several passengers were standing on the platform waiting for the train.',
          vi: 'Nhiều hành khách đang đứng trên sân ga chờ tàu.',
        },
      },
      {
        en: 'Walk = stroll',
        pos: 'v',
        ipa: '/wɔːk = strəʊl/',
        vi: 'Đi bộ',
        example: {
          en: 'Colleagues frequently stroll in the park during lunch break.',
          vi: 'Các đồng nghiệp thường đi dạo trong công viên vào giờ nghỉ trưa.',
        },
      },
      {
        en: 'Jog',
        pos: 'v',
        ipa: '/dʒɒɡ/',
        vi: 'Chạy bộ',
        example: {
          en: 'He jogs around the business park every morning before work.',
          vi: 'Anh ấy chạy bộ quanh khu công viên văn phòng mỗi sáng trước giờ làm.',
        },
      },
      {
        en: 'Jump',
        pos: 'v',
        ipa: '/dʒʌmp/',
        vi: 'Nhảy, tăng vọt',
        example: {
          en: 'Stock prices jumped after the quarterly earnings announcement.',
          vi: 'Giá cổ phiếu đã tăng vọt sau thông báo thu nhập quý.',
        },
      },
      {
        en: 'Kick',
        pos: 'v',
        ipa: '/kɪk/',
        vi: 'Đá, khởi động',
        example: {
          en: 'The team kicked off the promotional campaign this morning.',
          vi: 'Nhóm đã khởi động chiến dịch quảng bá vào sáng nay.',
        },
      },
      {
        en: 'Run',
        pos: 'v',
        ipa: '/rʌn/',
        vi: 'Chạy, điều hành',
        example: {
          en: 'She has been running the operations branch for over five years.',
          vi: 'Cô ấy đã điều hành chi nhánh vận hành được hơn 5 năm.',
        },
      },
      {
        en: 'Kneel',
        pos: 'v',
        ipa: '/niːl/',
        vi: 'Quỳ gối',
        example: {
          en: 'The technician knelt to inspect the network cables under the desk.',
          vi: 'Kỹ thuật viên quỳ xuống để kiểm tra cáp mạng dưới bàn.',
        },
      },
      {
        en: 'Enter',
        pos: 'v',
        ipa: '/ˈentər/',
        vi: 'Vào, đi vào',
        example: {
          en: 'Please swipe your access card before entering the security gate.',
          vi: 'Vui lòng quẹt thẻ truy cập trước khi đi vào cổng an ninh.',
        },
      },
    ],
  },
  {
    lessonId: 2,
    lessonTitle: 'Eyes & Mouth',
    words: [
      {
        en: 'Look at = gaze at = stare at',
        pos: 'v',
        ipa: '/lʊk ət = ɡeɪz ət = steər ət/',
        vi: 'Nhìn chằm chằm',
        example: {
          en: 'The architects are looking at the blueprints for the new tower.',
          vi: 'Các kiến trúc sư đang xem bản thiết kế của tòa tháp mới.',
        },
      },
      {
        en: 'Browse',
        pos: 'v',
        ipa: '/braʊz/',
        vi: 'Xem qua, lướt',
        example: {
          en: 'Customers can browse through our product catalog online.',
          vi: 'Khách hàng có thể lướt xem danh mục sản phẩm của chúng tôi trực tuyến.',
        },
      },
      {
        en: 'See',
        pos: 'v',
        ipa: '/siː/',
        vi: 'Nhìn, thấy',
        example: {
          en: 'I can see the stage clearly from my conference seat.',
          vi: 'Tôi có thể nhìn thấy sân khấu rõ ràng từ chỗ ngồi hội nghị.',
        },
      },
      {
        en: 'Glance at',
        pos: 'v',
        ipa: '/ɡlɑːns ət/',
        vi: 'Liếc nhìn',
        example: {
          en: 'The speaker glanced at his watch during the presentation.',
          vi: 'Diễn giả liếc nhìn đồng hồ trong lúc thuyết trình.',
        },
      },
      {
        en: 'Watch',
        pos: 'v',
        ipa: '/wɒtʃ/',
        vi: 'Xem',
        example: {
          en: 'Employees watched an instructional video on workplace safety.',
          vi: 'Nhân viên đã xem một video hướng dẫn về an toàn nơi làm việc.',
        },
      },
      {
        en: 'Read',
        pos: 'v',
        ipa: '/riːd/',
        vi: 'Đọc',
        example: {
          en: 'Please read the updated company handbook carefully.',
          vi: 'Vui lòng đọc kỹ sổ tay công ty đã được cập nhật.',
        },
      },
      {
        en: 'Cry',
        pos: 'v',
        ipa: '/kraɪ/',
        vi: 'Khóc',
        example: {
          en: 'The emotional farewell address touched many in the audience.',
          vi: 'Bài phát biểu chia tay đầy cảm xúc đã khiến nhiều người rơi lệ.',
        },
      },
      {
        en: 'Examine',
        pos: 'v',
        ipa: '/ɪɡˈzæmɪn/',
        vi: 'Kiểm tra',
        example: {
          en: 'The quality manager examined each finished product for defects.',
          vi: 'Quản lý chất lượng đã kiểm tra từng thành phẩm để tìm lỗi.',
        },
      },
      {
        en: 'Give a speech = present',
        pos: 'v',
        ipa: '/ɡɪv ə spiːtʃ = prɪˈzent/',
        vi: 'Thuyết trình',
        example: {
          en: 'The CEO will give a speech at the opening ceremony.',
          vi: 'Tổng giám đốc sẽ phát biểu tại lễ khai mạc.',
        },
      },
      {
        en: 'Eat',
        pos: 'v',
        ipa: '/iːt/',
        vi: 'Ăn',
        example: {
          en: 'Team members usually eat lunch together in the courtyard.',
          vi: 'Các thành viên trong nhóm thường ăn trưa cùng nhau ngoài sân.',
        },
      },
      {
        en: 'Talk',
        pos: 'v',
        ipa: '/tɔːk/',
        vi: 'Nói chuyện',
        example: {
          en: 'They talked about future investment opportunities over dinner.',
          vi: 'Họ đã nói chuyện về các cơ hội đầu tư tương lai trong bữa tối.',
        },
      },
      {
        en: 'Taste',
        pos: 'v',
        ipa: '/teɪst/',
        vi: 'Nếm',
        example: {
          en: 'The caterer invited us to taste the proposed banquet menu.',
          vi: 'Đơn vị phục vụ đã mời chúng tôi nếm thử thực đơn tiệc dự kiến.',
        },
      },
      {
        en: 'Laugh',
        pos: 'v',
        ipa: '/lɑːf/',
        vi: 'Cười lớn',
        example: {
          en: 'The colleagues laughed together during the casual team outing.',
          vi: 'Các đồng nghiệp cùng cười vui vẻ trong buổi dã ngoại của nhóm.',
        },
      },
      {
        en: 'Smile',
        pos: 'v',
        ipa: '/smaɪl/',
        vi: 'Cười mỉm',
        example: {
          en: 'The receptionist greeted visitors with a friendly smile.',
          vi: 'Nhân viên lễ tân chào đón khách với nụ cười thân thiện.',
        },
      },
      {
        en: 'Drink',
        pos: 'v',
        ipa: '/drɪŋk/',
        vi: 'Uống',
        example: {
          en: 'Filtered water and hot tea are provided in the breakroom.',
          vi: 'Nước lọc và trà nóng được cung cấp trong phòng nghỉ.',
        },
      },
      {
        en: 'Sing',
        pos: 'v',
        ipa: '/sɪŋ/',
        vi: 'Hát',
        example: {
          en: 'A local artist was hired to sing at the corporate charity gala.',
          vi: 'Một nghệ sĩ địa phương đã được mời hát tại đêm tiệc từ thiện của công ty.',
        },
      },
      {
        en: 'Speak',
        pos: 'v',
        ipa: '/spiːk/',
        vi: 'Nói',
        example: {
          en: 'Ms. Garcia will speak about supply chain management.',
          vi: 'Bà Garcia sẽ nói về quản lý chuỗi cung ứng.',
        },
      },
    ],
  },
  {
    lessonId: 3,
    lessonTitle: 'Body Actions',
    words: [
      {
        en: 'Get on/in/out',
        pos: 'v',
        ipa: '/ɡet ɒn / ɪn / aʊt/',
        vi: 'Lên/vào/xuống (xe)',
        example: {
          en: 'Passengers are getting on the airport shuttle bus.',
          vi: 'Hành khách đang lên xe buýt trung chuyển sân bay.',
        },
      },
      {
        en: 'Put on = wear',
        pos: 'v',
        ipa: '/pʊt ɒn = weər/',
        vi: 'Mặc, đeo, đội',
        example: {
          en: 'Visitors must put on protective glasses before touring the plant.',
          vi: 'Khách tham quan phải đeo kính bảo hộ trước khi tham quan nhà máy.',
        },
      },
      {
        en: 'Try on',
        pos: 'v',
        ipa: '/traɪ ɒn/',
        vi: 'Thử (quần áo)',
        example: {
          en: 'You can try on the blazer in the changing room upstairs.',
          vi: 'Bạn có thể thử chiếc áo khoác trong phòng thay đồ ở tầng trên.',
        },
      },
      {
        en: 'Lean on/over/against',
        pos: 'v',
        ipa: '/liːn ɒn / ˈəʊvər / əˈɡenst/',
        vi: 'Dựa vào/lên',
        example: {
          en: 'The visitor is leaning against the counter while waiting.',
          vi: 'Khách tham quan đang dựa vào quầy trong khi chờ đợi.',
        },
      },
      {
        en: 'Sit = be seated',
        pos: 'v',
        ipa: '/sɪt = bi ˈsiːtɪd/',
        vi: 'Ngồi',
        example: {
          en: 'Please remain seated until the plane comes to a full stop.',
          vi: 'Vui lòng giữ nguyên vị trí ngồi cho đến khi máy bay dừng hẳn.',
        },
      },
      {
        en: 'Climb',
        pos: 'v',
        ipa: '/klaɪm/',
        vi: 'Trèo lên',
        example: {
          en: 'The electrician climbed a ladder to fix the ceiling spotlight.',
          vi: 'Thợ điện trèo lên thang để sửa đèn chiếu trên trần.',
        },
      },
      {
        en: 'Bend',
        pos: 'v',
        ipa: '/bend/',
        vi: 'Cúi/khom người',
        example: {
          en: 'He bent down to pick up the dropped notepad from the floor.',
          vi: 'Anh ấy cúi xuống để nhặt cuốn sổ tay rơi trên sàn.',
        },
      },
      {
        en: 'Install',
        pos: 'v',
        ipa: '/ɪnˈstɔːl/',
        vi: 'Lắp đặt',
        example: {
          en: 'Technicians will install the new security system on Saturday.',
          vi: 'Các kỹ thuật viên sẽ lắp đặt hệ thống an ninh mới vào thứ Bảy.',
        },
      },
      {
        en: 'Line up = wait in line',
        pos: 'v',
        ipa: '/laɪn ʌp = weɪt ɪn laɪn/',
        vi: 'Xếp hàng',
        example: {
          en: 'Attendees lined up at the desk to register for the workshop.',
          vi: 'Những người tham dự đã xếp hàng tại bàn để đăng ký hội thảo.',
        },
      },
      {
        en: 'Serve',
        pos: 'v',
        ipa: '/sɜːrv/',
        vi: 'Phục vụ',
        example: {
          en: 'The hotel restaurant serves a breakfast buffet daily.',
          vi: 'Nhà hàng khách sạn phục vụ tiệc buffet sáng hàng ngày.',
        },
      },
      {
        en: 'Dig',
        pos: 'v',
        ipa: '/dɪɡ/',
        vi: 'Đào',
        example: {
          en: 'Construction crews are digging a trench along the roadside.',
          vi: 'Đội ngũ xây dựng đang đào một đường rãnh dọc theo lề đường.',
        },
      },
      {
        en: 'Lift',
        pos: 'v',
        ipa: '/lɪft/',
        vi: 'Nâng',
        example: {
          en: 'Always bend your knees when lifting heavy packages.',
          vi: 'Luôn gập đầu gối khi nâng các gói hàng nặng.',
        },
      },
      {
        en: 'Gather',
        pos: 'v',
        ipa: '/ˈɡæðər/',
        vi: 'Tụ tập',
        example: {
          en: 'Employees gathered in the auditorium for the town hall meeting.',
          vi: 'Nhân viên tập trung tại hội trường cho cuộc họp toàn thể.',
        },
      },
      {
        en: 'Set up',
        pos: 'v',
        ipa: '/set ʌp/',
        vi: 'Thiết lập',
        example: {
          en: 'They helped set up the display booths for the trade show.',
          vi: 'Họ đã giúp dựng các gian hàng trưng bày cho hội chợ thương mại.',
        },
      },
      {
        en: 'Post',
        pos: 'v',
        ipa: '/pəʊst/',
        vi: 'Đăng',
        example: {
          en: 'The holiday work schedule has been posted on the bulletin board.',
          vi: 'Lịch làm việc ngày lễ đã được đăng trên bảng thông báo.',
        },
      },
      {
        en: 'Decorate',
        pos: 'v',
        ipa: '/ˈdekəreɪt/',
        vi: 'Trang trí',
        example: {
          en: 'The banquet hall was beautifully decorated for the anniversary.',
          vi: 'Phòng tiệc được trang trí tuyệt đẹp cho lễ kỷ niệm.',
        },
      },
      {
        en: 'Replace',
        pos: 'v',
        ipa: '/rɪˈpleɪs/',
        vi: 'Thay thế',
        example: {
          en: 'We need to replace the outdated office desktop computers.',
          vi: 'Chúng ta cần thay thế các máy tính để bàn văn phòng đã lỗi thời.',
        },
      },
      {
        en: 'Cook',
        pos: 'v',
        ipa: '/kʊk/',
        vi: 'Nấu',
        example: {
          en: 'The head chef cooks authentic Mediterranean dishes.',
          vi: 'Bếp trưởng nấu các món ăn Địa Trung Hải truyền thống.',
        },
      },
      {
        en: 'Clean',
        pos: 'v',
        ipa: '/kliːn/',
        vi: 'Làm sạch',
        example: {
          en: 'The facilities crew cleans all meeting rooms every evening.',
          vi: 'Đội ngũ cơ sở vật chất dọn dẹp tất cả các phòng họp mỗi buổi tối.',
        },
      },
    ],
  },
  {
    lessonId: 4,
    lessonTitle: 'Household Items',
    words: [
      {
        en: 'Door',
        pos: 'n',
        ipa: '/dɔːr/',
        vi: 'Cửa ra vào',
        example: {
          en: 'Please make sure the conference room door is closed.',
          vi: 'Vui lòng đảm bảo cửa phòng họp đã được đóng.',
        },
      },
      {
        en: 'Window',
        pos: 'n',
        ipa: '/ˈwɪndəʊ/',
        vi: 'Cửa sổ',
        example: {
          en: 'Large windows provide plenty of natural sunlight to the office.',
          vi: 'Những cửa sổ lớn cung cấp nhiều ánh sáng tự nhiên cho văn phòng.',
        },
      },
      {
        en: 'Fan',
        pos: 'n',
        ipa: '/fæn/',
        vi: 'Quạt',
        example: {
          en: 'Turn on the ventilation fan to keep the room cool.',
          vi: 'Bật quạt thông gió để giữ phòng mát mẻ.',
        },
      },
      {
        en: 'Lamp',
        pos: 'n',
        ipa: '/læmp/',
        vi: 'Đèn',
        example: {
          en: 'There is an adjustable desk lamp beside every computer workstation.',
          vi: 'Có một chiếc đèn bàn điều chỉnh được bên cạnh mỗi vị trí máy tính.',
        },
      },
      {
        en: 'Cart',
        pos: 'n',
        ipa: '/kɑːrt/',
        vi: 'Xe đẩy',
        example: {
          en: 'He used a utility cart to transport heavy equipment.',
          vi: 'Anh ấy đã sử dụng một chiếc xe đẩy để vận chuyển thiết bị nặng.',
        },
      },
      {
        en: 'Roof',
        pos: 'n',
        ipa: '/ruːf/',
        vi: 'Mái nhà',
        example: {
          en: 'Contractors are installing solar panels on the facility roof.',
          vi: 'Nhà thầu đang lắp đặt tấm pin mặt trời trên mái của cơ sở.',
        },
      },
      {
        en: 'Broom',
        pos: 'n',
        ipa: '/bruːm/',
        vi: 'Chổi',
        example: {
          en: 'The janitor placed the broom inside the cleaning cupboard.',
          vi: 'Nhân viên tạp vụ đặt chiếc chổi vào bên trong tủ đồ dọn dẹp.',
        },
      },
      {
        en: 'Utensils',
        pos: 'n',
        ipa: '/juːˈtenslz/',
        vi: 'Dụng cụ nhà bếp',
        example: {
          en: 'Reusable cooking utensils are available in the staff kitchen.',
          vi: 'Dụng cụ nấu ăn tái sử dụng có sẵn trong nhà bếp của nhân viên.',
        },
      },
      {
        en: 'Countertop',
        pos: 'n',
        ipa: '/ˈkaʊntərtɑːp/',
        vi: 'Mặt bàn bếp',
        example: {
          en: 'Keep the breakroom countertop wiped clean and dry.',
          vi: 'Giữ mặt bàn phòng nghỉ luôn được lau sạch và khô ráo.',
        },
      },
      {
        en: 'Hammer',
        pos: 'n',
        ipa: '/ˈhæmər/',
        vi: 'Cái búa',
        example: {
          en: 'The carpenter used a hammer to secure the wooden frame.',
          vi: 'Người thợ mộc đã dùng búa để cố định khung gỗ.',
        },
      },
      {
        en: 'Ladder',
        pos: 'n',
        ipa: '/ˈlædər/',
        vi: 'Cái thang',
        example: {
          en: 'Make sure the step ladder is firmly positioned before climbing.',
          vi: 'Hãy chắc chắn thang đứng vững trước khi trèo lên.',
        },
      },
      {
        en: 'Plate',
        pos: 'n',
        ipa: '/pleɪt/',
        vi: 'Cái đĩa',
        example: {
          en: 'The waiter brought clean plates for the buffet lunch.',
          vi: 'Người phục vụ mang những chiếc đĩa sạch cho bữa trưa buffet.',
        },
      },
      {
        en: 'Wire',
        pos: 'n',
        ipa: '/ˈwaɪər/',
        vi: 'Dây kim loại, dây điện',
        example: {
          en: 'Bundle all loose computer wires neatly under the table.',
          vi: 'Buộc gọn các dây máy tính lỏng lẻo dưới bàn.',
        },
      },
      {
        en: 'Ceiling',
        pos: 'n',
        ipa: '/ˈsiːlɪŋ/',
        vi: 'Trần nhà',
        example: {
          en: 'Recessed spotlights were installed across the high ceiling.',
          vi: 'Đèn chiếu âm trần đã được lắp đặt trên trần nhà cao.',
        },
      },
      {
        en: 'Suitcase',
        pos: 'n',
        ipa: '/ˈsuːtkeɪs/',
        vi: 'Va li',
        example: {
          en: 'He packed a small suitcase for the two-day business seminar.',
          vi: 'Anh ấy xếp một chiếc va li nhỏ cho hội thảo kinh doanh 2 ngày.',
        },
      },
      {
        en: 'Waste bin',
        pos: 'n',
        ipa: '/weɪst bɪn/',
        vi: 'Thùng rác',
        example: {
          en: 'Place recyclable paper in the blue waste bin.',
          vi: 'Bỏ giấy tái chế vào thùng rác màu xanh dương.',
        },
      },
      {
        en: 'Refrigerator = fridge',
        pos: 'n',
        ipa: '/rɪˈfrɪdʒəreɪtər = frɪdʒ/',
        vi: 'Tủ lạnh',
        example: {
          en: 'Staff can store their lunch boxes inside the office refrigerator.',
          vi: 'Nhân viên có thể cất hộp cơm trưa trong tủ lạnh văn phòng.',
        },
      },
      {
        en: 'Luggage = baggage',
        pos: 'n',
        ipa: '/ˈlʌɡɪdʒ = ˈbæɡɪdʒ/',
        vi: 'Hành lý',
        example: {
          en: 'Airlines charge extra fees for oversized baggage.',
          vi: 'Hãng hàng không tính thêm phí cho hành lý quá khổ.',
        },
      },
      {
        en: 'Stove',
        pos: 'n',
        ipa: '/stəʊv/',
        vi: 'Bếp lò',
        example: {
          en: 'The restaurant kitchen is equipped with modern gas stoves.',
          vi: 'Bếp nhà hàng được trang bị các bếp gas hiện đại.',
        },
      },
      {
        en: 'Carpet',
        pos: 'n',
        ipa: '/ˈkɑːrpɪt/',
        vi: 'Thảm',
        example: {
          en: "A plush grey carpet was installed in the director's office.",
          vi: 'Một tấm thảm màu xám êm ái đã được trải trong phòng giám đốc.',
        },
      },
      {
        en: 'Pipe',
        pos: 'n',
        ipa: '/paɪp/',
        vi: 'Ống nước',
        example: {
          en: 'A plumber was called to repair the leaking water pipe.',
          vi: 'Thợ sửa ống nước đã được gọi để sửa ống nước bị rò rỉ.',
        },
      },
      {
        en: 'Napkin',
        pos: 'n',
        ipa: '/ˈnæpkɪn/',
        vi: 'Giấy ăn, khăn ăn',
        example: {
          en: 'Paper napkins are located next to the cutlery station.',
          vi: 'Khăn ăn bằng giấy được đặt cạnh khu vực lấy dao muỗng nĩa.',
        },
      },
      {
        en: 'Shelf',
        pos: 'n',
        ipa: '/ʃelf/',
        vi: 'Giá, kệ',
        example: {
          en: 'The reference manuals are arranged neatly on the bottom shelf.',
          vi: 'Sổ tay hướng dẫn tham khảo được xếp gọn trên kệ dưới cùng.',
        },
      },
      {
        en: 'Container',
        pos: 'n',
        ipa: '/kənˈteɪnər/',
        vi: 'Vật đựng, thùng chứa',
        example: {
          en: 'Shipping containers arrived at the freight terminal this morning.',
          vi: 'Các container vận chuyển đã đến ga hàng hóa vào sáng nay.',
        },
      },
      {
        en: 'Vase',
        pos: 'n',
        ipa: '/vɑːz/',
        vi: 'Bình hoa',
        example: {
          en: 'A vase of fresh flowers is placed on the reception counter.',
          vi: 'Một bình hoa tươi được đặt trên quầy lễ tân.',
        },
      },
      {
        en: 'Basket',
        pos: 'n',
        ipa: '/ˈbɑːskɪt/',
        vi: 'Rổ, giỏ',
        example: {
          en: 'Leave your completed questionnaires in the collection basket.',
          vi: 'Để bảng câu hỏi đã hoàn thành của bạn vào giỏ thu thập.',
        },
      },
    ],
  },
  {
    lessonId: 5,
    lessonTitle: 'Verbs',
    words: [
      {
        en: 'Refrigerator',
        pos: 'n',
        ipa: '/rɪˈfrɪdʒəreɪtər/',
        vi: 'Tủ lạnh',
        example: {
          en: 'Please label your personal food items in the breakroom refrigerator.',
          vi: 'Vui lòng dán nhãn thức ăn cá nhân của bạn trong tủ lạnh phòng nghỉ.',
        },
      },
      {
        en: 'Grab',
        pos: 'v',
        ipa: '/ɡræb/',
        vi: 'Nắm lấy, bắt lấy',
        example: {
          en: "Let's grab a quick coffee before the client presentation starts.",
          vi: 'Chúng ta hãy uống nhanh một cốc cà phê trước khi bài thuyết trình cho khách hàng bắt đầu.',
        },
      },
      {
        en: 'Twist',
        pos: 'v',
        ipa: '/twɪst/',
        vi: 'Xoắn, vặn',
        example: {
          en: 'Twist the cap clockwise to seal the container tightly.',
          vi: 'Vặn nắp theo chiều kim đồng hồ để đóng chặt hộp chứa.',
        },
      },
      {
        en: 'Spread',
        pos: 'v',
        ipa: '/spred/',
        vi: 'Trải ra, lan rộng',
        example: {
          en: "Positive reviews helped the brand's reputation spread across the region.",
          vi: 'Các đánh giá tích cực đã giúp danh tiếng của thương hiệu lan rộng khắp khu vực.',
        },
      },
      {
        en: 'Counter',
        pos: 'n',
        ipa: '/ˈkaʊntər/',
        vi: 'Bàn, quầy',
        example: {
          en: 'Please check in at the registration counter upon arrival.',
          vi: 'Vui lòng làm thủ tục tại quầy đăng ký khi đến nơi.',
        },
      },
      {
        en: 'Apply',
        pos: 'v',
        ipa: '/əˈplaɪ/',
        vi: 'Áp dụng, nộp đơn',
        example: {
          en: 'Qualified candidates are encouraged to apply for the position online.',
          vi: 'Các ứng viên đủ điều kiện được khuyến khích nộp đơn ứng tuyển trực tuyến.',
        },
      },
      {
        en: 'Promote',
        pos: 'v',
        ipa: '/prəˈməʊt/',
        vi: 'Quảng bá, thăng chức',
        example: {
          en: 'She was promoted to senior marketing manager last quarter.',
          vi: 'Cô ấy đã được thăng chức lên quản lý tiếp thị cấp cao vào quý trước.',
        },
      },
      {
        en: 'Report',
        pos: 'n',
        ipa: '/rɪˈpɔːrt/',
        vi: 'Báo cáo',
        example: {
          en: 'The annual financial report demonstrated steady revenue growth.',
          vi: 'Báo cáo tài chính hàng năm đã thể hiện sự tăng trưởng doanh thu ổn định.',
        },
      },
      {
        en: 'Participate in',
        pos: 'v',
        ipa: '/pɑːrˈtɪsɪpeɪt ɪn/',
        vi: 'Tham gia vào',
        example: {
          en: 'All staff are invited to participate in the professional development workshop.',
          vi: 'Tất cả nhân viên được mời tham gia hội thảo phát triển chuyên môn.',
        },
      },
      {
        en: 'Complete',
        pos: 'v',
        ipa: '/kəmˈpliːt/',
        vi: 'Hoàn thành',
        example: {
          en: 'Please complete the feedback questionnaire before leaving today.',
          vi: 'Vui lòng hoàn thành bảng câu hỏi khảo sát trước khi ra về hôm nay.',
        },
      },
      {
        en: 'Recommend',
        pos: 'v',
        ipa: '/ˌrekəˈmend/',
        vi: 'Đề xuất, giới thiệu',
        example: {
          en: 'I would highly recommend this vendor for premium printing services.',
          vi: 'Tôi rất muốn giới thiệu nhà cung cấp này cho các dịch vụ in ấn chất lượng cao.',
        },
      },
      {
        en: 'Investment',
        pos: 'n',
        ipa: '/ɪnˈvestmənt/',
        vi: 'Đầu tư',
        example: {
          en: 'The company announced a significant investment in cloud infrastructure.',
          vi: 'Công ty đã công bố một khoản đầu tư đáng kể vào cơ sở hạ tầng đám mây.',
        },
      },
      {
        en: 'Solve the problem',
        pos: 'v',
        ipa: '/sɒlv ðə ˈprɒbləm/',
        vi: 'Giải quyết vấn đề',
        example: {
          en: 'Our IT support team worked quickly to solve the network connection problem.',
          vi: 'Nhóm hỗ trợ CNTT của chúng tôi đã xử lý nhanh chóng để giải quyết sự cố kết nối mạng.',
        },
      },
      {
        en: 'Cafeteria',
        pos: 'n',
        ipa: '/ˌkæfəˈtɪəriə/',
        vi: 'Căn tin, nhà ăn',
        example: {
          en: 'The staff cafeteria offers healthy meal options at affordable prices.',
          vi: 'Căn tin nhân viên cung cấp các bữa ăn lành mạnh với giá cả phải chăng.',
        },
      },
      {
        en: 'Increase',
        pos: 'v',
        ipa: '/ɪnˈkriːs/',
        vi: 'Tăng lên',
        example: {
          en: 'The enterprise aims to increase overseas export sales by 15%.',
          vi: 'Doanh nghiệp đặt mục tiêu tăng doanh số xuất khẩu sang nước ngoài thêm 15%.',
        },
      },
    ],
  },
  {
    lessonId: 6,
    lessonTitle: 'Action & Things',
    words: [
      {
        en: 'Plug in',
        pos: 'v',
        ipa: '/plʌɡ ɪn/',
        vi: 'Cắm điện',
        example: {
          en: 'Make sure the multimedia projector is plugged in securely.',
          vi: 'Đảm bảo máy chiếu đa phương tiện đã được cắm điện chắc chắn.',
        },
      },
      {
        en: 'Bend down',
        pos: 'v',
        ipa: '/bend daʊn/',
        vi: 'Cúi xuống',
        example: {
          en: 'He bent down to pick up his dropped employee badge.',
          vi: 'Anh ấy cúi xuống để nhặt thẻ nhân viên bị rơi.',
        },
      },
      {
        en: 'Tray',
        pos: 'n',
        ipa: '/treɪ/',
        vi: 'Khay',
        example: {
          en: 'The flight attendant carried a beverage tray down the aisle.',
          vi: 'Tiếp viên hàng không mang một khay đồ uống dọc lối đi.',
        },
      },
      {
        en: 'Approach',
        pos: 'v',
        ipa: '/əˈprəʊtʃ/',
        vi: 'Tiếp cận',
        example: {
          en: 'Several prospective clients approached our exhibition booth.',
          vi: 'Một số khách hàng tiềm năng đã tiếp cận gian hàng triển lãm của chúng tôi.',
        },
      },
      {
        en: 'Install',
        pos: 'v',
        ipa: '/ɪnˈstɔːl/',
        vi: 'Cài đặt, lắp đặt',
        example: {
          en: 'IT staff will install productivity software on all workstations.',
          vi: 'Nhân viên CNTT sẽ cài đặt phần mềm năng suất trên tất cả máy làm việc.',
        },
      },
      {
        en: 'Material',
        pos: 'n',
        ipa: '/məˈtɪəriəl/',
        vi: 'Vật liệu, tài liệu',
        example: {
          en: 'All workshop training materials are available for download online.',
          vi: 'Tất cả tài liệu đào tạo của buổi hội thảo đều có sẵn để tải về trực tuyến.',
        },
      },
      {
        en: 'Keyboard',
        pos: 'n',
        ipa: '/ˈkiːbɔːrd/',
        vi: 'Bàn phím',
        example: {
          en: 'An ergonomic wireless keyboard can reduce wrist strain during long hours.',
          vi: 'Bàn phím công thái học không dây có thể giảm căng cổ tay trong nhiều giờ làm.',
        },
      },
      {
        en: 'Passenger',
        pos: 'n',
        ipa: '/ˈpæsɪndʒər/',
        vi: 'Hành khách',
        example: {
          en: 'Passengers must show their boarding pass and passport at the gate.',
          vi: 'Hành khách phải xuất trình thẻ lên máy bay và hộ chiếu tại cổng.',
        },
      },
      {
        en: 'Bridge',
        pos: 'n',
        ipa: '/brɪdʒ/',
        vi: 'Cầu',
        example: {
          en: 'The suspension bridge provides the main connection to the seaport.',
          vi: 'Cây cầu treo là tuyến kết nối chính đến cảng biển.',
        },
      },
      {
        en: 'Boat',
        pos: 'n',
        ipa: '/bəʊt/',
        vi: 'Thuyền',
        example: {
          en: 'The corporate delegation took a sightseeing boat across the bay.',
          vi: 'Đoàn đại biểu doanh nghiệp đã đi thuyền ngắm cảnh qua vịnh.',
        },
      },
      {
        en: 'Pier',
        pos: 'n',
        ipa: '/pɪər/',
        vi: 'Bến tàu',
        example: {
          en: 'The ferry departs from Pier 4 every thirty minutes.',
          vi: 'Phà khởi hành từ Bến tàu số 4 sau mỗi 30 phút.',
        },
      },
      {
        en: 'Agree',
        pos: 'v',
        ipa: '/əˈɡriː/',
        vi: 'Đồng ý',
        example: {
          en: 'Both companies agreed on the proposed terms of the merger.',
          vi: 'Cả hai công ty đã đồng ý với các điều khoản đề xuất của vụ sáp nhập.',
        },
      },
      {
        en: 'Reduce',
        pos: 'v',
        ipa: '/rɪˈdjuːs/',
        vi: 'Giảm',
        example: {
          en: 'We implemented measures to reduce administrative operational costs.',
          vi: 'Chúng tôi đã thực hiện các biện pháp để giảm chi phí vận hành hành chính.',
        },
      },
      {
        en: 'Contain',
        pos: 'v',
        ipa: '/kənˈteɪn/',
        vi: 'Chứa đựng',
        example: {
          en: 'The confidential envelope contains salary adjustment details.',
          vi: 'Phong bì bảo mật chứa chi tiết điều chỉnh lương.',
        },
      },
      {
        en: 'Campaign',
        pos: 'n',
        ipa: '/kæmˈpeɪn/',
        vi: 'Chiến dịch',
        example: {
          en: 'The nationwide promotional campaign generated hundreds of inquiries.',
          vi: 'Chiến dịch quảng bá toàn quốc đã tạo ra hàng trăm yêu cầu tư vấn.',
        },
      },
    ],
  },
  {
    lessonId: 7,
    lessonTitle: 'Jobs & Places',
    words: [
      {
        en: 'Director',
        pos: 'n',
        ipa: '/dɪˈrektər/',
        vi: 'Giám đốc',
        example: {
          en: 'The marketing director presented the third-quarter sales report.',
          vi: 'Giám đốc tiếp thị đã trình bày báo cáo doanh số quý 3.',
        },
      },
      {
        en: 'Manager',
        pos: 'n',
        ipa: '/ˈmænɪdʒər/',
        vi: 'Quản lý',
        example: {
          en: 'Please notify the branch manager if you need to take leave.',
          vi: 'Vui lòng thông báo cho quản lý chi nhánh nếu bạn cần xin nghỉ phép.',
        },
      },
      {
        en: 'Supervisor',
        pos: 'n',
        ipa: '/ˈsuːpərvaɪzər/',
        vi: 'Giám sát viên',
        example: {
          en: 'The shift supervisor conducts regular equipment safety checks.',
          vi: 'Người giám sát ca làm việc tiến hành kiểm tra an toàn thiết bị thường xuyên.',
        },
      },
      {
        en: 'Intern',
        pos: 'n',
        ipa: '/ˈɪntɜːrn/',
        vi: 'Thực tập sinh',
        example: {
          en: 'The college intern assisted with social media marketing campaigns.',
          vi: 'Thực tập sinh đại học đã hỗ trợ các chiến dịch tiếp thị truyền thông xã hội.',
        },
      },
      {
        en: 'Department',
        pos: 'n',
        ipa: '/dɪˈpɑːrtmənt/',
        vi: 'Bộ phận, phòng ban',
        example: {
          en: 'Our customer service department handles over a thousand calls daily.',
          vi: 'Bộ phận chăm sóc khách hàng của chúng tôi xử lý hơn một nghìn cuộc gọi mỗi ngày.',
        },
      },
      {
        en: 'Accountant',
        pos: 'n',
        ipa: '/əˈkaʊntənt/',
        vi: 'Kế toán',
        example: {
          en: 'The certified accountant reviewed the corporate tax filings.',
          vi: 'Kế toán có chứng chỉ đã xem xét hồ sơ khai thuế của doanh nghiệp.',
        },
      },
      {
        en: 'Secretary',
        pos: 'n',
        ipa: '/ˈsekrəteri/',
        vi: 'Thư ký',
        example: {
          en: 'The executive secretary scheduled all appointments for the CEO.',
          vi: 'Thư ký điều hành đã lên lịch cho tất cả các cuộc hẹn của Tổng giám đốc.',
        },
      },
      {
        en: 'Assistant',
        pos: 'n',
        ipa: '/əˈsɪstənt/',
        vi: 'Trợ lý',
        example: {
          en: 'The research assistant compiled statistical data for the study.',
          vi: 'Trợ lý nghiên cứu đã tổng hợp dữ liệu thống kê cho nghiên cứu.',
        },
      },
      {
        en: 'Receptionist',
        pos: 'n',
        ipa: '/rɪˈsepʃənɪst/',
        vi: 'Lễ tân',
        example: {
          en: 'The receptionist greeted clients warmly and provided visitor badges.',
          vi: 'Nhân viên lễ tân chào đón khách nồng hậu và cấp thẻ khách.',
        },
      },
      {
        en: 'Worker',
        pos: 'n',
        ipa: '/ˈwɜːrkər/',
        vi: 'Công nhân',
        example: {
          en: 'Factory workers are provided with protective safety uniforms.',
          vi: 'Công nhân nhà máy được cung cấp đồng phục bảo hộ an toàn.',
        },
      },
      {
        en: 'Plumber',
        pos: 'n',
        ipa: '/ˈplʌmər/',
        vi: 'Thợ ống nước',
        example: {
          en: 'We hired a licensed plumber to fix the kitchen water pipes.',
          vi: 'Chúng tôi đã thuê một thợ sửa ống nước có giấy phép để sửa các đường ống nước nhà bếp.',
        },
      },
      {
        en: 'Market',
        pos: 'n',
        ipa: '/ˈmɑːrkɪt/',
        vi: 'Chợ, thị trường',
        example: {
          en: 'The enterprise is exploring opportunities in the European market.',
          vi: 'Doanh nghiệp đang khám phá các cơ hội tại thị trường Châu Âu.',
        },
      },
      {
        en: 'Newsstand',
        pos: 'n',
        ipa: '/ˈnjuːzstænd/',
        vi: 'Quán báo',
        example: {
          en: 'He purchased a financial magazine at the airport newsstand.',
          vi: 'Anh ấy đã mua một tạp chí tài chính tại quầy báo sân bay.',
        },
      },
      {
        en: 'Training',
        pos: 'n',
        ipa: '/ˈtreɪnɪŋ/',
        vi: 'Đào tạo',
        example: {
          en: 'All newly hired personnel must undergo two weeks of safety training.',
          vi: 'Tất cả nhân sự mới được tuyển dụng phải trải qua 2 tuần đào tạo an toàn.',
        },
      },
      {
        en: 'Conference',
        pos: 'n',
        ipa: '/ˈkɒnfərəns/',
        vi: 'Hội nghị',
        example: {
          en: 'The annual international business conference will take place in Chicago.',
          vi: 'Hội nghị kinh doanh quốc tế thường niên sẽ diễn ra tại Chicago.',
        },
      },
    ],
  },
  {
    lessonId: 8,
    lessonTitle: 'Workplace & Schedule',
    words: [
      {
        en: 'Quarter',
        pos: 'n',
        ipa: '/ˈkwɔːrtər/',
        vi: 'Quý (năm tài chính, 3 tháng)',
        example: {
          en: 'Our company achieved record sales in the third quarter.',
          vi: 'Công ty chúng tôi đã đạt doanh số kỷ lục trong quý ba.',
        },
      },
      {
        en: 'Employee',
        pos: 'n',
        ipa: '/ɪmˈplɔɪiː/',
        vi: 'Nhân viên',
        example: {
          en: 'The company provides health insurance to all full-time employees.',
          vi: 'Công ty cung cấp bảo hiểm y tế cho tất cả nhân viên toàn thời gian.',
        },
      },
      {
        en: 'Survey',
        pos: 'n',
        ipa: '/ˈsɜːrveɪ/',
        vi: 'Khảo sát',
        example: {
          en: 'Please complete the customer satisfaction survey after your visit.',
          vi: 'Vui lòng hoàn thành bản khảo sát sự hài lòng của khách hàng sau chuyến thăm.',
        },
      },
      {
        en: 'Equipment',
        pos: 'n',
        ipa: '/ɪˈkwɪpmənt/',
        vi: 'Thiết bị',
        example: {
          en: 'The office ordered modern computer equipment for the new department.',
          vi: 'Văn phòng đã đặt mua thiết bị máy tính hiện đại cho phòng ban mới.',
        },
      },
      {
        en: 'Storage closet',
        pos: 'n',
        ipa: '/ˈstɔːrɪdʒ ˈklɑːzɪt/',
        vi: 'Phòng kho, tủ chứa đồ',
        example: {
          en: 'Extra printer paper and toner are kept in the storage closet.',
          vi: 'Giấy in và mực in dự phòng được cất trong tủ chứa đồ.',
        },
      },
      {
        en: 'Be responsible for',
        pos: 'v',
        ipa: '/biː rɪˈspɑːnsəbl fɔːr/',
        vi: 'Chịu trách nhiệm về',
        example: {
          en: 'Ms. Sarah is responsible for organizing the annual conference.',
          vi: 'Cô Sarah chịu trách nhiệm tổ chức hội nghị thường niên.',
        },
      },
      {
        en: 'Return',
        pos: 'v',
        ipa: '/rɪˈtɜːrn/',
        vi: 'Trả lại, quay lại',
        example: {
          en: 'Customers may return defective items within thirty days of purchase.',
          vi: 'Khách hàng có thể trả lại sản phẩm bị lỗi trong vòng 30 ngày kể từ ngày mua.',
        },
      },
      {
        en: 'Supply',
        pos: 'n',
        ipa: '/səˈplaɪ/',
        vi: 'Nguồn cung cấp, đồ dùng',
        example: {
          en: 'We need to order more office supplies before the end of the week.',
          vi: 'Chúng ta cần đặt thêm đồ dùng văn phòng trước cuối tuần.',
        },
      },
      {
        en: 'Retire',
        pos: 'v',
        ipa: '/rɪˈtaɪər/',
        vi: 'Nghỉ hưu',
        example: {
          en: 'The senior director plans to retire at the end of this year.',
          vi: 'Giám đốc cấp cao dự định sẽ nghỉ hưu vào cuối năm nay.',
        },
      },
      {
        en: 'Delivery',
        pos: 'n',
        ipa: '/dɪˈlɪvəri/',
        vi: 'Giao hàng, sự chuyển phát',
        example: {
          en: 'The express delivery package is scheduled to arrive tomorrow morning.',
          vi: 'Gói hàng chuyển phát nhanh dự kiến sẽ đến vào sáng mai.',
        },
      },
      {
        en: 'Lead',
        pos: 'v',
        ipa: '/liːd/',
        vi: 'Dẫn dắt, chủ trì',
        example: {
          en: 'Mr. David was selected to lead the marketing strategy team.',
          vi: 'Ông David đã được chọn để dẫn dắt đội ngũ chiến lược tiếp thị.',
        },
      },
      {
        en: 'Seminar',
        pos: 'n',
        ipa: '/ˈsemɪnɑːr/',
        vi: 'Hội thảo, chuyên đề',
        example: {
          en: 'Over fifty managers attended the leadership training seminar.',
          vi: 'Hơn 50 nhà quản lý đã tham dự buổi hội thảo đào tạo năng lực lãnh đạo.',
        },
      },
      {
        en: 'Assignment',
        pos: 'n',
        ipa: '/əˈsaɪnmənt/',
        vi: 'Nhiệm vụ, bài tập công việc',
        example: {
          en: 'She completed her research assignment well ahead of the deadline.',
          vi: 'Cô ấy đã hoàn thành nhiệm vụ nghiên cứu trước thời hạn khá nhiều.',
        },
      },
      {
        en: 'Ticket',
        pos: 'n',
        ipa: '/ˈtɪkɪt/',
        vi: 'Vé',
        example: {
          en: 'You should book train tickets in advance to get the best discount.',
          vi: 'Bạn nên đặt vé tàu trước để nhận được mức giảm giá tốt nhất.',
        },
      },
      {
        en: 'Form',
        pos: 'n',
        ipa: '/fɔːrm/',
        vi: 'Mẫu đơn, biểu mẫu',
        example: {
          en: 'Please complete the application form and attach two references.',
          vi: 'Vui lòng hoàn thành mẫu đơn đăng ký và đính kèm hai thư giới thiệu.',
        },
      },
    ],
  },
  {
    lessonId: 9,
    lessonTitle: 'Events & Media',
    words: [
      {
        en: 'Post office',
        pos: 'n',
        ipa: '/pəʊst ˈɒfɪs/',
        vi: 'Bưu điện',
        example: {
          en: 'I mailed the international package at the central post office.',
          vi: 'Tôi đã gửi gói hàng quốc tế tại bưu điện trung tâm.',
        },
      },
      {
        en: 'Leave',
        pos: 'v',
        ipa: '/liːv/',
        vi: 'Rời đi',
        example: {
          en: 'The morning train leaves the station at precisely 8:30 AM.',
          vi: 'Chuyến tàu buổi sáng rời ga chính xác lúc 8 giờ 30 sáng.',
        },
      },
      {
        en: 'Behind schedule',
        pos: 'adj',
        ipa: '/bɪˈhaɪnd ˈskedʒuːl/',
        vi: 'Trễ hẹn, chậm tiến độ',
        example: {
          en: 'Due to heavy rains, the building construction is behind schedule.',
          vi: 'Do mưa lớn, việc xây dựng tòa nhà đang bị chậm tiến độ.',
        },
      },
      {
        en: 'Exhibit',
        pos: 'n',
        ipa: '/ɪɡˈzɪbɪt/',
        vi: 'Triển lãm, hiện vật',
        example: {
          en: 'The modern art exhibit attracted thousands of visitors over the weekend.',
          vi: 'Triển lãm nghệ thuật hiện đại đã thu hút hàng ngàn du khách vào cuối tuần.',
        },
      },
      {
        en: 'Artist',
        pos: 'n',
        ipa: '/ˈɑːrtɪst/',
        vi: 'Nghệ sĩ',
        example: {
          en: 'A talented graphic artist created the visual identity for the brand.',
          vi: 'Một nghệ sĩ đồ họa tài năng đã tạo ra bộ nhận diện thương hiệu.',
        },
      },
      {
        en: 'Theater',
        pos: 'n',
        ipa: '/ˈθiːətər/',
        vi: 'Nhà hát',
        example: {
          en: 'The annual shareholder meeting was held at the civic theater.',
          vi: 'Cuộc họp cổ đông thường niên đã được tổ chức tại nhà hát thành phố.',
        },
      },
      {
        en: 'Box office',
        pos: 'n',
        ipa: '/ˈbɒks ˌɒfɪs/',
        vi: 'Phòng vé',
        example: {
          en: 'Tickets can be collected directly from the theater box office.',
          vi: 'Vé có thể được nhận trực tiếp từ phòng vé của nhà hát.',
        },
      },
      {
        en: 'Take place',
        pos: 'v',
        ipa: '/teɪk pleɪs/',
        vi: 'Diễn ra',
        example: {
          en: 'The press conference will take place in the main conference room.',
          vi: 'Buổi họp báo sẽ diễn ra tại phòng hội nghị chính.',
        },
      },
      {
        en: 'Candidate',
        pos: 'n',
        ipa: '/ˈkændɪdət/',
        vi: 'Ứng viên',
        example: {
          en: 'The interviewing committee shortlisted three qualified candidates.',
          vi: 'Hội đồng phỏng vấn đã chọn ra ba ứng viên đủ tiêu chuẩn vào danh sách rút gọn.',
        },
      },
      {
        en: 'Town',
        pos: 'n',
        ipa: '/taʊn/',
        vi: 'Thị trấn',
        example: {
          en: 'The company opened a new distribution center just outside of town.',
          vi: 'Công ty đã mở một trung tâm phân phối mới ngay ngoại ô thị trấn.',
        },
      },
      {
        en: 'Human Resources',
        pos: 'n',
        ipa: '/ˈhjuːmən ˈriːzɔːrsɪz/',
        vi: 'Phòng nhân sự',
        example: {
          en: 'Please contact Human Resources to submit your health claim forms.',
          vi: 'Vui lòng liên hệ phòng Nhân sự để nộp đơn yêu cầu bồi thường bảo hiểm y tế.',
        },
      },
      {
        en: 'Advertising project',
        pos: 'n',
        ipa: '/ˈædvərtaɪzɪŋ ˈprɒdʒekt/',
        vi: 'Dự án quảng cáo',
        example: {
          en: 'The creative team launched a dynamic new advertising project this month.',
          vi: 'Đội ngũ sáng tạo đã triển khai một dự án quảng cáo mới năng động trong tháng này.',
        },
      },
      {
        en: 'Brand',
        pos: 'n',
        ipa: '/brænd/',
        vi: 'Thương hiệu',
        example: {
          en: 'Consistent quality is essential for building a recognizable brand.',
          vi: 'Chất lượng đồng đều là điều cần thiết để xây dựng một thương hiệu được nhận diện tốt.',
        },
      },
      {
        en: 'Design',
        pos: 'n',
        ipa: '/dɪˈzaɪn/',
        vi: 'Thiết kế',
        example: {
          en: 'The updated website design is intuitive and responsive.',
          vi: 'Thiết kế trang web cập nhật rất trực quan và tương thích mọi thiết bị.',
        },
      },
      {
        en: 'Corner',
        pos: 'n',
        ipa: '/ˈkɔːrnər/',
        vi: 'Góc',
        example: {
          en: 'The convenience store is located right on the street corner.',
          vi: 'Cửa hàng tiện lợi nằm ngay ở góc phố.',
        },
      },
    ],
  },
  {
    lessonId: 10,
    lessonTitle: 'Office & Activities',
    words: [
      {
        en: 'Account',
        pos: 'n',
        ipa: '/əˈkaʊnt/',
        vi: 'Tài khoản',
        example: {
          en: 'Clients can check their banking account balance using the app.',
          vi: 'Khách hàng có thể kiểm tra số dư tài khoản ngân hàng bằng ứng dụng.',
        },
      },
      {
        en: 'To be in charge of',
        pos: 'v',
        ipa: '/tuː biː ɪn tʃɑːrdʒ əv/',
        vi: 'Phụ trách',
        example: {
          en: 'Mr. Kim is in charge of overseas procurement logistics.',
          vi: 'Ông Kim phụ trách hậu cần thu mua quốc tế.',
        },
      },
      {
        en: 'Paperwork',
        pos: 'n',
        ipa: '/ˈpeɪpərwɜːrk/',
        vi: 'Công việc giấy tờ',
        example: {
          en: 'She spent the morning processing legal paperwork for the lease.',
          vi: 'Cô ấy đã dành cả buổi sáng để xử lý giấy tờ pháp lý cho hợp đồng thuê.',
        },
      },
      {
        en: 'Entrance',
        pos: 'n',
        ipa: '/ˈentrəns/',
        vi: 'Lối vào',
        example: {
          en: 'Visitors must sign the guest register at the main building entrance.',
          vi: 'Khách đến thăm phải ký sổ khách tại lối vào chính của tòa nhà.',
        },
      },
      {
        en: 'Corner',
        pos: 'n',
        ipa: '/ˈkɔːrnər/',
        vi: 'Góc',
        example: {
          en: 'Place the emergency first-aid kit in the corner near the exit.',
          vi: 'Đặt bộ sơ cứu khẩn cấp ở góc gần lối thoát hiểm.',
        },
      },
      {
        en: 'Repair',
        pos: 'v',
        ipa: '/rɪˈper/',
        vi: 'Sửa chữa',
        example: {
          en: 'Maintenance technicians worked overnight to repair the broken elevator.',
          vi: 'Kỹ thuật viên bảo trì đã làm việc xuyên đêm để sửa thang máy bị hỏng.',
        },
      },
      {
        en: 'Colleague',
        pos: 'n',
        ipa: '/ˈkɒliːɡ/',
        vi: 'Đồng nghiệp',
        example: {
          en: 'I consulted several colleagues before submitting the final proposal.',
          vi: 'Tôi đã tham khảo ý kiến nhiều đồng nghiệp trước khi nộp đề xuất cuối cùng.',
        },
      },
      {
        en: 'Furniture',
        pos: 'n',
        ipa: '/ˈfɜːrnɪtʃər/',
        vi: 'Nội thất',
        example: {
          en: 'The firm purchased contemporary ergonomic furniture for the new offices.',
          vi: 'Công ty đã mua sắm đồ nội thất công thái học hiện đại cho văn phòng mới.',
        },
      },
      {
        en: 'Announce',
        pos: 'v',
        ipa: '/əˈnaʊns/',
        vi: 'Thông báo',
        example: {
          en: "The CEO will announce the company's annual financial results tomorrow.",
          vi: 'Tổng giám đốc sẽ công bố kết quả tài chính hàng năm của công ty vào ngày mai.',
        },
      },
      {
        en: 'Competition',
        pos: 'n',
        ipa: '/ˌkɒmpəˈtɪʃn/',
        vi: 'Cuộc thi, sự cạnh tranh',
        example: {
          en: 'Fierce market competition has driven continuous innovation.',
          vi: 'Sự cạnh tranh gay gắt trên thị trường đã thúc đẩy đổi mới không ngừng.',
        },
      },
      {
        en: 'Banquet',
        pos: 'n',
        ipa: '/ˈbæŋkwɪt/',
        vi: 'Tiệc chiêu đãi',
        example: {
          en: 'The anniversary celebration concluded with an elegant banquet.',
          vi: 'Lễ kỷ niệm đã khép lại bằng một bữa tiệc chiêu đãi trang trọng.',
        },
      },
      {
        en: 'Workshop',
        pos: 'n',
        ipa: '/ˈwɜːrkʃɒp/',
        vi: 'Hội thảo, buổi tập huấn',
        example: {
          en: 'She registered for a hands-on workshop on project management software.',
          vi: 'Cô ấy đã đăng ký một buổi tập huấn thực hành về phần mềm quản lý dự án.',
        },
      },
      {
        en: 'Cancel',
        pos: 'v',
        ipa: '/ˈkænsl/',
        vi: 'Hủy bỏ',
        example: {
          en: 'The outdoor press conference was canceled because of severe weather.',
          vi: 'Buổi họp báo ngoài trời đã bị hủy do thời tiết xấu.',
        },
      },
      {
        en: 'Attend',
        pos: 'v',
        ipa: '/əˈtend/',
        vi: 'Tham dự',
        example: {
          en: 'Over three hundred industry specialists attended the annual symposium.',
          vi: 'Hơn ba trăm chuyên gia trong ngành đã tham dự hội nghị thường niên.',
        },
      },
      {
        en: 'Cross',
        pos: 'v',
        ipa: '/krɒs/',
        vi: 'Đi qua, băng qua',
        example: {
          en: 'Pedestrians should cross the busy boulevard only at marked crosswalks.',
          vi: 'Người đi bộ chỉ nên băng qua đại lộ đông đúc tại vạch kẻ đường dành cho người đi bộ.',
        },
      },
    ],
  },
  {
    lessonId: 11,
    lessonTitle: 'Services & Appointments',
    words: [
      {
        en: 'Tag',
        pos: 'n',
        ipa: '/tæɡ/',
        vi: 'Thẻ gắn',
        example: {
          en: 'Ensure every luggage bag has a destination tag with your contact details.',
          vi: 'Đảm bảo mỗi vali hành lý đều có thẻ gắn điểm đến kèm thông tin liên lạc của bạn.',
        },
      },
      {
        en: 'Fill out',
        pos: 'v',
        ipa: '/fɪl aʊt/',
        vi: 'Điền vào',
        example: {
          en: 'Job applicants must fill out the questionnaire before their interview.',
          vi: 'Các ứng viên phải điền vào bảng câu hỏi trước buổi phỏng vấn.',
        },
      },
      {
        en: 'Machine',
        pos: 'n',
        ipa: '/məˈʃiːn/',
        vi: 'Máy móc',
        example: {
          en: 'The automated vending machine accepts both cash and digital payments.',
          vi: 'Máy bán hàng tự động chấp nhận cả tiền mặt và thanh toán kỹ thuật số.',
        },
      },
      {
        en: 'Apartment',
        pos: 'n',
        ipa: '/əˈpɑːrtmənt/',
        vi: 'Căn hộ',
        example: {
          en: 'The studio apartment is located within walking distance of the subway.',
          vi: 'Căn hộ studio nằm ở khoảng cách có thể đi bộ đến ga tàu điện ngầm.',
        },
      },
      {
        en: 'Appointment',
        pos: 'n',
        ipa: '/əˈpɔɪntmənt/',
        vi: 'Cuộc hẹn',
        example: {
          en: 'I scheduled a dental appointment for Thursday afternoon at 2:00 PM.',
          vi: 'Tôi đã lên lịch một cuộc hẹn nha khoa vào chiều thứ Năm lúc 2 giờ.',
        },
      },
      {
        en: 'Location',
        pos: 'n',
        ipa: '/ləʊˈkeɪʃn/',
        vi: 'Địa điểm',
        example: {
          en: 'The prime downtown location ensures high foot traffic for the retail store.',
          vi: 'Vị trí đắc địa ở trung tâm thành phố đảm bảo lượng khách qua lại cao cho cửa hàng.',
        },
      },
      {
        en: 'Meeting',
        pos: 'n',
        ipa: '/ˈmiːtɪŋ/',
        vi: 'Cuộc họp',
        example: {
          en: 'The weekly department meeting has been rescheduled to Wednesday morning.',
          vi: 'Cuộc họp phòng ban hàng tuần đã được đổi lịch sang sáng thứ Tư.',
        },
      },
      {
        en: 'Down the street',
        pos: 'adv',
        ipa: '/daʊn ðə striːt/',
        vi: 'Phía cuối đường',
        example: {
          en: 'There is a 24-hour convenience store right down the street.',
          vi: 'Có một cửa hàng tiện lợi 24 giờ ở ngay phía cuối đường.',
        },
      },
      {
        en: 'Block',
        pos: 'n',
        ipa: '/blɒk/',
        vi: 'Khu phố, dãy nhà',
        example: {
          en: 'The post office is just three blocks away from our office building.',
          vi: 'Bưu điện chỉ cách tòa nhà văn phòng của chúng tôi ba dãy nhà.',
        },
      },
      {
        en: 'Inspector',
        pos: 'n',
        ipa: '/ɪnˈspektər/',
        vi: 'Thanh tra viên',
        example: {
          en: 'A health inspector conducted a routine safety audit of the cafeteria.',
          vi: 'Một thanh tra y tế đã tiến hành kiểm toán an toàn định kỳ tại nhà ăn.',
        },
      },
      {
        en: 'Direction',
        pos: 'n',
        ipa: '/dəˈrekʃn/',
        vi: 'Hướng, hướng dẫn',
        example: {
          en: 'Follow the overhead signs for directions to the international terminal.',
          vi: 'Theo dõi các biển báo trên cao để biết hướng đi đến nhà ga quốc tế.',
        },
      },
      {
        en: 'Discount',
        pos: 'n',
        ipa: '/ˈdɪskaʊnt/',
        vi: 'Giảm giá',
        example: {
          en: 'Subscribers receive a ten percent discount on all online purchases.',
          vi: 'Người đăng ký nhận được mức giảm giá 10% cho tất cả các giao dịch mua trực tuyến.',
        },
      },
      {
        en: 'Application form',
        pos: 'n',
        ipa: '/ˌæplɪˈkeɪʃn fɔːrm/',
        vi: 'Đơn xin việc, mẫu đăng ký',
        example: {
          en: 'Please download and fill out the employment application form.',
          vi: 'Vui lòng tải xuống và điền vào mẫu đơn xin việc.',
        },
      },
      {
        en: 'Price',
        pos: 'n',
        ipa: '/praɪs/',
        vi: 'Giá cả',
        example: {
          en: 'Competitive prices have helped attract new budget-conscious shoppers.',
          vi: 'Mức giá cạnh tranh đã giúp thu hút những người mua sắm quan tâm đến ngân sách.',
        },
      },
      {
        en: 'Reservation',
        pos: 'n',
        ipa: '/ˌrezərˈveɪʃn/',
        vi: 'Đặt chỗ',
        example: {
          en: 'We recommend booking a restaurant reservation on weekend evenings.',
          vi: 'Chúng tôi khuyên bạn nên đặt chỗ nhà hàng vào các buổi tối cuối tuần.',
        },
      },
    ],
  },
  {
    lessonId: 12,
    lessonTitle: 'Operations & Maintenance',
    words: [
      {
        en: 'Polish',
        pos: 'v',
        ipa: '/ˈpɒlɪʃ/',
        vi: 'Đánh bóng',
        example: {
          en: 'The custodial staff polished the conference room table until it shone.',
          vi: 'Nhân viên tạp vụ đã đánh bóng bàn phòng họp cho đến khi sáng bóng.',
        },
      },
      {
        en: 'Tire',
        pos: 'n',
        ipa: '/ˈtaɪər/',
        vi: 'Lốp xe',
        example: {
          en: 'Check your automobile tire pressure regularly before long road trips.',
          vi: 'Kiểm tra áp suất lốp ô tô thường xuyên trước các chuyến đi xa.',
        },
      },
      {
        en: 'Automobile',
        pos: 'n',
        ipa: '/ˈɔːtəməʊbiːl/',
        vi: 'Ô tô',
        example: {
          en: 'The manufacturer unveiled a new line of electric automobiles.',
          vi: 'Nhà sản xuất đã ra mắt dòng xe ô tô điện mới.',
        },
      },
      {
        en: 'Package',
        pos: 'n',
        ipa: '/ˈpækɪdʒ/',
        vi: 'Gói hàng',
        example: {
          en: 'A courier delivered the urgent international package this morning.',
          vi: 'Nhân viên chuyển phát nhanh đã giao gói hàng quốc tế khẩn vào sáng nay.',
        },
      },
      {
        en: 'Pave',
        pos: 'v',
        ipa: '/peɪv/',
        vi: 'Lát đường',
        example: {
          en: 'The construction crew paved the entire factory driveway with fresh asphalt.',
          vi: 'Đội ngũ xây dựng đã lát toàn bộ đường lái xe của nhà máy bằng nhựa đường mới.',
        },
      },
      {
        en: 'Instrument',
        pos: 'n',
        ipa: '/ˈɪnstrəmənt/',
        vi: 'Dụng cụ, thiết bị đo',
        example: {
          en: 'Technicians use precision calibration instruments in the cleanroom.',
          vi: 'Các kỹ thuật viên sử dụng các dụng cụ hiệu chuẩn chính xác trong phòng sạch.',
        },
      },
      {
        en: 'Performance',
        pos: 'n',
        ipa: '/pərˈfɔːrməns/',
        vi: 'Biểu diễn, hiệu suất',
        example: {
          en: 'Her exceptional work performance was recognized with an annual award.',
          vi: 'Hiệu suất làm việc xuất sắc của cô ấy đã được ghi nhận bằng giải thưởng hàng năm.',
        },
      },
      {
        en: 'Brochure',
        pos: 'n',
        ipa: '/brəʊˈʃʊr/',
        vi: 'Tờ quảng cáo, sách thông tin',
        example: {
          en: "The colorful brochure highlights the resort's amenities and tour packages.",
          vi: 'Cuốn sách nhỏ đầy màu sắc nêu bật các tiện nghi và gói tour của khu nghỉ dưỡng.',
        },
      },
      {
        en: 'Cart',
        pos: 'n',
        ipa: '/kɑːrt/',
        vi: 'Xe đẩy hàng',
        example: {
          en: 'Luggage carts are readily available in the airport arrival concourse.',
          vi: 'Xe đẩy hành lý luôn có sẵn tại sảnh đến của sân bay.',
        },
      },
      {
        en: 'Shift',
        pos: 'n',
        ipa: '/ʃɪft/',
        vi: 'Ca làm việc',
        example: {
          en: 'The manufacturing plant operates around the clock with three eight-hour shifts.',
          vi: 'Nhà máy sản xuất hoạt động suốt ngày đêm với ba ca làm việc 8 tiếng.',
        },
      },
      {
        en: 'Warehouse',
        pos: 'n',
        ipa: '/ˈwerhaʊs/',
        vi: 'Kho hàng',
        example: {
          en: 'Finished merchandise is securely packed and stored in the central warehouse.',
          vi: 'Hàng hóa thành phẩm được đóng gói an toàn và lưu trữ trong kho trung tâm.',
        },
      },
      {
        en: 'Decide',
        pos: 'v',
        ipa: '/dɪˈsaɪd/',
        vi: 'Quyết định',
        example: {
          en: 'The executive board will decide on the partnership terms next Monday.',
          vi: 'Hội đồng quản trị sẽ quyết định về các điều khoản hợp tác vào thứ Hai tới.',
        },
      },
      {
        en: 'Program',
        pos: 'n',
        ipa: '/ˈprəʊɡræm/',
        vi: 'Chương trình',
        example: {
          en: 'Our company offers a mentorship program for newly recruited graduates.',
          vi: 'Công ty chúng tôi cung cấp chương trình cố vấn cho các sinh viên mới tốt nghiệp.',
        },
      },
      {
        en: 'Budget',
        pos: 'n',
        ipa: '/ˈbʌdʒɪt/',
        vi: 'Ngân sách',
        example: {
          en: 'We must stay within our approved departmental travel budget.',
          vi: 'Chúng ta phải duy trì trong phạm vi ngân sách đi lại đã được phê duyệt của bộ phận.',
        },
      },
      {
        en: 'Maintenance',
        pos: 'n',
        ipa: '/ˈmeɪntənəns/',
        vi: 'Bảo trì',
        example: {
          en: 'Scheduled routine maintenance helps prevent unexpected machinery breakdowns.',
          vi: 'Bảo trì định kỳ theo lịch trình giúp ngăn ngừa các sự cố máy móc bất ngờ.',
        },
      },
    ],
  },
];

// Normalized all words with unique id
export const allWords: Word[] = rawLessonsData.flatMap((lesson) =>
  lesson.words.map((w, index) => ({
    ...w,
    lessonId: lesson.lessonId,
    id: `l${lesson.lessonId}_w${index + 1}_${w.en.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`,
  })),
);

export const lessons = rawLessonsData.map((lesson) => ({
  lessonId: lesson.lessonId,
  lessonTitle: lesson.lessonTitle,
  words: allWords.filter((w) => w.lessonId === lesson.lessonId),
}));
