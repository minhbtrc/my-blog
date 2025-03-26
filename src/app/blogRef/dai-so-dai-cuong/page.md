+++
tags = "math, 🇻🇳"
date = "22 August, 2020"
+++

# Đại Số Đại Cương

Nguyễn Viết Đông, Trần Ngọc Hội - Đại học Quốc gia Thành phố Hồ Chí Minh, Trường Đại học Khoa Học Tự Nhiên.

## Lời nói đầu

Giáo trình **Đại số đại cương** được viết theo chương trình quy định của học phần cùng tên, 4 tín chỉ, nhằm phục vụ cho sinh viên ngành Toán-Tin học. Với thời lượng hạn hẹp như thế, giáo trình chỉ bao gồm những kiến thức rất cơ bản về các cấu trúc đại số mà theo chúng tôi là cần thiết cho mọi sinh viên Toán-Tin học dù cho họ chọn bất cứ hướng nào ở giai đoạn chuyên ngành. Các cấu trúc đại số cơ bản được trình bày trong giáo trình là: Nhóm, Vành, Trường, Vành đa thức, Môđun và Đại số. Những kết quả sâu hơn về lý thuyết nhóm, lý thuyết vành,... sẽ được trình bày trong một giáo trình khác mang tên Đại số hiện đại.

Đại số đại cương là học phần đại số trừu tượng đầu tiên trong chương trình chuyên ngành của sinh viên Toán-Tin học, là học phần cơ sở giúp sinh viên bước đầu tiếp cận với những ký hiệu và tính toán hình thức. Vì thế, với mục đích phục vụ rộng rãi cho mọi đối tượng sinh viên, bên cạnh tính chặt chẽ và logic vốn rất được chú trọng, chúng tôi còn đưa vào giáo trình nhiều ví dụ minh hoạ. Với phương cách như thế, chúng tôi tin rằng sinh viên sẽ dễ tiếp thu hơn và độc giả sẽ tìm thấy đôi điều bổ ích khi đọc giáo trình này.

Cuối mỗi chương là hệ thống bài tập khá đầy đủ và phong phú giúp sinh viên rèn luyệ kỹ năng tư duy nhằm tượng tận hơn về những vấn đề trong lý thuyết. Một số kế quả trong lý thuyết cũng được đưa vào dưới dạng bài tập. Những bài tập có đánh dấu \* là những bài khó, đồi hỏi bạn đọc phải đầu tư nhiều thời gian và công sức hơn so với các bài tập khác.

Chúng tôi xin chân thành cảm ơn Bộ môn Đại số, KHoa Toán-Tin học, Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh và Nhà xuất bản Đại học Quốc gia Thành phố Hồ Chí Minh đã tạo điều kiện thuận lợi để giáo trình này sớm đến tay bạn đọc. Đặc biệt xin cảm ơn Thạc sĩ Trịnh Thanh Đèo và Cử nhân Tống Viết Phi Hùng đã góp sức biên soạn phần bài tập và đã nhiệt tình soạn thảo toàn bộ giáo trình bằng $\LaTeX$. Mặc dù đã có nhiều cố gắng, giáo trình vẫn có thể còn nhiều khiếm khuyết. Chúng tôi rất mong nhận được sự phê bình, góp ý của quý độc giả. Mọi ý kiến xin vui lòng gửi về Bộ môn Đại số, KHoa Toán-Tin học, Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh, 227 Nguyễn Văn Cừ, Quận 5, Thành phố Hồ Chí Minh.

_Thành phố Hồ Chí Minh, tháng 6 năm 2005_

**CÁC TÁC GIẢ**

## Đôi lời riêng

Trước hết, tôi không phải là tác giả hay thuộc nhóm tác giả của cuốn sách **Đại số đại cương** này. Riêng bản thân tôi rất thích cuốn sách này vì sự dễ hiểu và trình bày khoa học. Tuy nhiên, cuốn sách được xuất bản dưới định dạng ảnh (nhúng trong PDF) và không hỗ trợ tìm kiếm văn bản dẫn đến việc tra cứu, tham khảo gặp nhiều khó khăn. Dự án này giúp số hoá lại cuốn sách dưới định dạng văn bản thân thiện để hỗ trợ nghiên cứu tốt hơn cho bản thân và cộng đồng. Cuối cùng, bản điện tử của cuốn sách gốc có thể tìm thấy [tại đây](/static/Đại%20Số%20Đại%20Cương.pdf).

_Thành phố Hồ Chí Minh, tháng 8 năm 2020_

**PHAN SƠN TỰ**

---

# Mục lục

[Chương I. NHÓM](/blog/dai-so-dai-cuong/chuong-i-nhom)

1. [Phép toán hai ngôi](/blog/dai-so-dai-cuong/chuong-i-nhom#1-phép-toán-hai-ngôi)
2. [Nửa nhóm](/blog/dai-so-dai-cuong/chuong-i-nhom#2-nửa-nhóm)
3. [Khái niệm về nhóm](/blog/dai-so-dai-cuong/chuong-i-nhom#3-khái-niệm-về-nhóm)
4. [Nhóm hoán vị](/blog/dai-so-dai-cuong/chuong-i-nhom#4-nhóm-hoán-vị)
5. [Nhóm con](/blog/dai-so-dai-cuong/chuong-i-nhom#5-nhóm-con)
6. [Nhóm con cyclic và nhóm cyclic](/blog/dai-so-dai-cuong/chuong-i-nhom#6-nhóm-con-cyclic-và-nhóm-cyclic)
7. [Nhóm con chuẩn tắc và nhóm thương](/blog/dai-so-dai-cuong/chuong-i-nhom#7-nhóm-con-chuẩn-tắc-và-nhóm-thương)
8. [Đồng cấu](/blog/dai-so-dai-cuong/chuong-i-nhom#8-đồng-cấu)

Chương II. VÀNH VÀ TRƯỜNG

1. Khái niệm về vành
2. Vành con, Ideal và vành thương
3. Đồng cấu
4. Miền nguyên và trường

Chương III. VÀNH ĐA THỨC

1. Vành đa thức một ẩn
2. Nghiệm của đa thức
3. Đa thức nội suy Lagrange
4. Đa thức trên trường số thực và phức
5. Đa thức trên trường số hữu tỷ
6. Vành đa thức nhiều ẩn
7. Đa thức đối xứng
8. Kết thức, biệt thức

Chương IV. MÔĐUN VÀ ĐẠI SỐ

1. Khái niệm về môđun
2. Đồng cấu môđun
3. Môđun tự do
4. Đại số

---

# Tài liệu tham khảo

[1] Nguyễn Viết Đông, Trần Huyên, _Đại số đồng điều_, NXB Đại học Quốc gia Thành phố Hồ Chí Minh, 2002.

[2] Lê Thanh Hà, _Các cấu trúc đại số cơ bản_, NXB Giáo dục, 2000.

[3] Đặng Xuân Hồng, _Giáo trình Đại số I_, Đại học Tổng hợp Thành phố Hồ Chí Minh, 1977.

[4] Nguyễn Hữu Việt Hưng, _Đại số đại cương_, NXB Giáo dục, 1998.

[5] Mỵ Vinh Quang, _Đại số đại cương_, NXB Giáo dục, 1998.

[6] Hoàng Xuân Sính, _Đại số đại cương_, NXB Giáo dục, 1997.

[7] M. I. Kargapolov & Ju. I. Merzljakov, _Fundamentals of the Theory of Groups_, English translation, Springer-Verlag, 1970.

[8] A. Kurosh, _Giáo trình Đại số cao cấp_, Nauka, Moskva, 1975 (Tiếng Nga).

[9] Joseph J. Rotman, _An Introduction to the Theory of Groups_, 4th edition, , Springer-Verlag, 1995.
