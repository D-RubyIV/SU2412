import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, text: string) => {
    // Thiết lập transporter với thông tin email của bạn
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nthungan223@gmail.com', // Thay bằng email của bạn
            pass: 'diaw babc uvju lezh', // Thay bằng mật khẩu email của bạn
        },
    });

    // Thiết lập nội dung email
    const mailOptions = {
        from: 'nthungan223@gmail.com', // Thay bằng email của bạn
        to: email,
        subject: subject,
        text: text,
    };

    // Gửi email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
