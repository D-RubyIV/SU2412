import React, { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Html5QrcodeScanner } from "html5-qrcode";
import emailjs from 'emailjs-com';
import { CloseOutlined } from '@mui/icons-material';

// Khai báo các interface
interface Staff {
    id?: string;
    ma: string;
    email: string;
    password: string;
    gioiTinh: boolean;
    soDienThoai: string;
    cccd: string;
    diaChi: string;
    hoTen: string;
    ngaySinh: string;
    trangThai?: string;
    ghiChu?: string;
    tinh: string;
    quan: string;
    phuong: string;
    deleted?: boolean;
}

interface Tinh {
    id: string,
    name: string,
    full_name: string
}

interface Quan {
    id: string,
    name: string,
    full_name: string
}

interface Phuong {
    id: string,
    name: string,
    full_name: string
}

interface AddNhanVienProps {
    onAddSuccess?: () => void;
}

const AddNhanVien: React.FC<AddNhanVienProps> = ({ onAddSuccess }) => {
    const initialStaffState: Staff = {
        ma: generateRandomMaNV(),
        email: '',
        password: generateRandomPassword(),
        gioiTinh: true,
        soDienThoai: '',
        cccd: '',
        diaChi: '',
        hoTen: '',
        ngaySinh: '',
        tinh: '',
        quan: '',
        phuong: '',
        trangThai: 'active'
    };

    const [newStaff, setNewStaff] = useState<Staff>(initialStaffState);
    const [formErrors, setFormErrors] = useState<Partial<Staff>>({});
    const [provinces, setProvinces] = useState<Tinh[]>([]);
    const [districts, setDistricts] = useState<Quan[]>([]);
    const [wards, setWards] = useState<Phuong[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false);
    const scannerRef = useRef<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProvinces();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | { name?: any; value: any }>) => {
        const { name, value } = e.target;
        setNewStaff({ ...newStaff, [name]: value });
    };

    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
            const data = response.data;
            if (data.error === 0) {
                setProvinces(data.data);
            } else {
                console.error('Lỗi khi tải dữ liệu tỉnh/thành phố:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API tỉnh/thành phố:', error);
        }
    };

    const fetchDistricts = async (provinceId: string) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
            const data_district = response.data;
            if (data_district.error === 0) {
                setDistricts(data_district.data);
            } else {
                console.error('Lỗi khi tải dữ liệu quận/huyện:', data_district.message);
            }
        } catch (error) {
            console.error(`Lỗi khi gọi API quận/huyện với provinceId ${provinceId}:`, error);
        }
    };

    const fetchWards = async (districtId: string) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            const data_ward = response.data;
            if (data_ward.error === 0) {
                setWards(data_ward.data);
            } else {
                console.error('Lỗi khi tải dữ liệu phường/xã:', data_ward.message);
            }
        } catch (error) {
            console.error(`Lỗi khi gọi API phường/xã với districtId ${districtId}:`, error);
        }
    };

    const handleProvinceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const province = event.target.value as Tinh;
        setNewStaff(prevState => ({
            ...prevState,
            tinh: province.full_name,
        }));
        fetchDistricts(province.id);
    };

    const handleDistrictChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const district = event.target.value as Quan;
        setNewStaff(prevState => ({
            ...prevState,
            quan: district.full_name,
        }));
        fetchWards(district.id);
    };

    const handleWardChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const ward = event.target.value as Phuong;
        setNewStaff(prevState => ({
            ...prevState,
            phuong: ward.full_name,
        }));
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(newStaff);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            let response;

            if (isEditMode) {
                response = await axios.put<Staff>(`http://localhost:8080/api/staffs/${newStaff.id}`, newStaff);
                setSnackbarMessage('Cập nhật nhân viên thành công');
            } else {
                response = await axios.post<Staff>('http://localhost:8080/api/staffs', newStaff);
                setSnackbarMessage('Thêm nhân viên thành công');
            }

            console.log('Saved staff:', response.data);

            const serviceId = 'service_tmmslu9';
            const templateId = 'template_lad6zvl';
            const publicKey = '2TdUStOWX9A6vm7Ex';

            const templateParams = {
                from_name: 'BeeShop',
                from_email: 'no-reply@beeshop.com',
                to_name: newStaff.hoTen,
                to_email: newStaff.email,
                message: `Your account:\nEmployee code: ${newStaff.ma}\nPassword: ${newStaff.password}`,
            };

            const emailResponse = await emailjs.send(serviceId, templateId, templateParams, publicKey);
            console.log('Email sent successfully!', emailResponse);

            setNewStaff(initialStaffState);
            setFormErrors({});
            setSnackbarMessage('Email sent successfully');
            setSnackbarOpen(true);

            if (typeof onAddSuccess === 'function') {
                onAddSuccess();
            } else {
                navigate('/manage/nhan-vien');
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Lỗi khi lưu thông tin nhân viên hoặc gửi email');
            setSnackbarOpen(true);
        }
    };

    const validateForm = (newStaff: Staff): Partial<Staff> => {
        const errors: Partial<Staff> = {};

        if (!newStaff.hoTen) {
            errors.hoTen = 'Họ và Tên là bắt buộc';
        } else if (!/^[\p{L}\s]+$/u.test(newStaff.hoTen)) {
            errors.hoTen = 'Họ và Tên chỉ chứa chữ cái và khoảng trắng';
        }

        if (!newStaff.soDienThoai) {
            errors.soDienThoai = 'Số điện thoại là bắt buộc';
        } else if (!/^\d{10,11}$/.test(newStaff.soDienThoai)) {
            errors.soDienThoai = 'Số điện thoại không hợp lệ';
        }

        if (!newStaff.email) {
            errors.email = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStaff.email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!newStaff.cccd) {
            errors.cccd = 'CCCD là bắt buộc';
        } else if (!/^\d{12}$/.test(newStaff.cccd)) {
            errors.cccd = 'CCCD phải chứa 12 số';
        }

        if (!newStaff.ngaySinh) {
            errors.ngaySinh = 'Ngày sinh là bắt buộc';
        } else {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(newStaff.ngaySinh)) {
                errors.ngaySinh = 'Ngày sinh không hợp lệ (YYYY-MM-DD)';
            } else {
                const ngaySinhDate = new Date(newStaff.ngaySinh);
                const today = new Date();
                if (ngaySinhDate > today) {
                    errors.ngaySinh = 'Ngày sinh không được lớn hơn ngày hiện tại';
                } else {
                    let age = today.getFullYear() - ngaySinhDate.getFullYear();
                    const monthDiff = today.getMonth() - ngaySinhDate.getMonth();
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < ngaySinhDate.getDate())) {
                        age--;
                    }
                    if (age < 16 || age > 40) {
                        errors.ngaySinh = 'Tuổi phải lớn hơn 16 và nhỏ hơn 40 tuổi';
                    }
                }
            }
        }

        if (!newStaff.diaChi) {
            errors.diaChi = 'Địa chỉ là bắt buộc';
        }

        if (!newStaff.tinh) {
            errors.tinh = 'Tỉnh là bắt buộc';
        }

        if (!newStaff.quan) {
            errors.quan = 'Quận là bắt buộc';
        }

        if (!newStaff.phuong) {
            errors.phuong = 'Phường là bắt buộc';
        }

        return errors;
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleQuetCCCDNhanVienClick = () => {
        setOpenDialog(true); // Mở dialog khi click vào nút "Quét CCCD"
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const parseDate = (dateString: string): string | null => {
        if (dateString.length === 8) {
            const day = dateString.slice(0, 2);
            const month = dateString.slice(2, 4);
            const year = dateString.slice(4, 8);
            const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            return formattedDate;
        }
        return null;
    };

    useEffect(() => {
        if (openDialog && scannerRef.current) {
            const html5QrCodeScanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: 350 },
                false
            );

            html5QrCodeScanner.render(
                (data) => {
                    const cccdParts = data.split('|');
                    if (cccdParts.length >= 5) {
                        const cccd = cccdParts[0];
                        const hoTen = cccdParts[2];
                        const ngaySinh = parseDate(cccdParts[3]);
                        if (!ngaySinh) {
                            console.error('Invalid date format in QR code');
                            return;
                        }
                        const gioiTinh = cccdParts[4] === 'Nam';
                        const diaChi = cccdParts[5];
                        const diaChiSplit = diaChi.split(",");
                        const soNha = diaChiSplit[0];
                        const tinhOBJ = provinces.find(s => s.full_name.toLowerCase().includes(diaChiSplit[3].toLowerCase()));

                        if (tinhOBJ?.id) {
                            axios.get(`https://esgoo.net/api-tinhthanh/2/${tinhOBJ?.id}.htm`).then(function (response) {
                                if (response.status === 200) {
                                    setDistricts(response.data.data);

                                    if (Array.isArray(response.data.data)) {
                                        const foundQuanOBJ = (response.data.data as Quan[]).find(s => s.full_name.toLowerCase().includes(diaChiSplit[2].toLowerCase()));
                                        setNewStaff(prevState => ({
                                            ...prevState,
                                            quan: foundQuanOBJ?.full_name || "",
                                        }));

                                        if (foundQuanOBJ?.full_name) {
                                            axios.get(`https://esgoo.net/api-tinhthanh/3/${foundQuanOBJ.id}.htm`).then(function (response) {
                                                if (response.status === 200) {
                                                    setWards(response.data.data)
                                                    if (Array.isArray(response.data.data)) {
                                                        const foundPhuongOBJ = (response.data.data as Phuong[]).find(s => s.full_name.toLowerCase().includes(diaChiSplit[1].toLowerCase()));
                                                        setNewStaff(prevState => ({
                                                            ...prevState,
                                                            phuong: foundPhuongOBJ?.full_name || "",
                                                        }));
                                                    } else {
                                                        console.error("Expected an array but received:", response.data);
                                                    }
                                                }
                                            })
                                        }
                                    } else {
                                        console.error("Expected an array but received:", response.data);
                                    }

                                    setNewStaff(prevState => ({
                                        ...prevState,
                                        cccd: cccd,
                                        hoTen: hoTen,
                                        ngaySinh: ngaySinh,
                                        gioiTinh: gioiTinh,
                                        diaChi: soNha,
                                        tinh: tinhOBJ?.full_name || "",
                                    }));
                                }
                            });
                        } else {
                            setNewStaff(prevState => ({
                                ...prevState,
                                cccd: cccd,
                                hoTen: hoTen,
                                ngaySinh: ngaySinh,
                                gioiTinh: gioiTinh,
                                diaChi: soNha,
                                tinh: tinhOBJ?.full_name || "",
                            }));
                        }

                        setOpenDialog(false);
                        html5QrCodeScanner.clear();
                    } else {
                        console.error('Dữ liệu mã QR không đúng định dạng');
                    }
                },
                (error) => {
                    console.error(error);
                }
            );

            return () => {
                html5QrCodeScanner.clear();
            };
        }
    }, [openDialog, provinces]);

    return (
        <Fragment>
            <Grid item>
                <Typography variant="h5" color="textPrimary" fontWeight="bold" style={{ color: '#666' }}>
                    THÊM MỚI NHÂN VIÊN
                </Typography>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                <Button variant="contained" color="primary" onClick={handleQuetCCCDNhanVienClick}>
                    Quét CCCD
                </Button>
            </Box>
            <div className={`shadow-xl px-8 z-10 bg-white py-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/6 ${openDialog ? "" : "hidden"}`}>
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <label>Quét CCCD</label>
                        <button onClick={handleCloseDialog}><CloseOutlined /></button>
                    </div>
                    <div>
                        <div id="reader" ref={scannerRef}></div>
                    </div>
                </div>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Họ và tên"
                                    name="hoTen"
                                    value={newStaff.hoTen}
                                    onChange={handleInputChange}
                                    error={!!formErrors.hoTen}
                                    helperText={formErrors.hoTen}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    label="CCCD"
                                    name="cccd"
                                    value={newStaff.cccd}
                                    onChange={handleInputChange}
                                    error={!!formErrors.cccd}
                                    helperText={formErrors.cccd}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    label="Ngày sinh"
                                    type="date"
                                    name="ngaySinh"
                                    value={newStaff.ngaySinh}
                                    onChange={handleInputChange}
                                    error={!!formErrors.ngaySinh}
                                    helperText={formErrors.ngaySinh}
                                    fullWidth
                                    required
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormControl component="fieldset" margin="normal">
                                    <FormLabel component="legend">Giới tính</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gioiTinh"
                                        name="gioiTinh"
                                        value={newStaff.gioiTinh ? 'true' : 'false'}
                                        onChange={(e) => setNewStaff({ ...newStaff, gioiTinh: e.target.value === 'true' })}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="false" control={<Radio />} label="Nữ" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth required margin="normal" error={!!formErrors.tinh}>
                                    <InputLabel>Tỉnh/Thành phố</InputLabel>
                                    <Select
                                        name="tinh"
                                        value={provinces.find(s => s.full_name === newStaff.tinh) || ""}
                                        onChange={handleProvinceChange}
                                        label="Tỉnh/Thành phố"
                                    >
                                        {provinces.map(province => (
                                            <MenuItem key={province.id} value={province}>{province.full_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>




                                <FormControl fullWidth required margin="normal" error={!!formErrors.quan}>
                                    <InputLabel>Quận/Huyện</InputLabel>
                                    <Select
                                        name="quan"
                                        value={Array.isArray(districts) && districts.find(s => s.full_name === newStaff.quan) || ""}
                                        onChange={handleDistrictChange}
                                        label="Quận/Huyện"
                                    >
                                        {Array.isArray(districts) && districts.map(district => (
                                            <MenuItem key={district.id} value={district}>{district.full_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth required margin="normal" error={!!formErrors.phuong}>
                                    <InputLabel>Phường/Xã</InputLabel>
                                    <Select
                                        name="phuong"
                                        value={Array.isArray(wards) && wards.find(s => s.full_name === newStaff.phuong) || ""}
                                        onChange={handleWardChange}
                                        label="Phường/Xã"
                                    >
                                        {wards.map(ward => (
                                            <MenuItem key={ward.id} value={ward}>{ward.full_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Địa Chỉ"
                                    name="diaChi"
                                    value={newStaff.diaChi}
                                    onChange={handleInputChange}
                                    error={!!formErrors.diaChi}
                                    helperText={formErrors.diaChi}
                                    fullWidth
                                    required
                                    margin="normal"
                                />


                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>


                                <TextField
                                    label="Số điện thoại"
                                    name="soDienThoai"
                                    value={newStaff.soDienThoai}
                                    onChange={handleInputChange}
                                    error={!!formErrors.soDienThoai}
                                    helperText={formErrors.soDienThoai}
                                    fullWidth
                                    required
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={newStaff.email}
                                    onChange={handleInputChange}
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                />


                                <TextField
                                    label="Ghi chú"
                                    name="ghiChu"
                                    value={newStaff.ghiChu}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline // Cho phép nhiều dòng
                                    rows={4.5} // Số dòng mặc định khi không có nội dung
                                    margin="normal"
                                />


                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    style={{ marginRight: 10 }}
                                >
                                    {isEditMode ? 'Cập nhật' : 'Thêm mới'}
                                </Button>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => navigate('/manage/nhan-vien')}
                                >
                                    Hủy bỏ
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
            {/* Camera $ Scanner */}
            {/* <div id="reader" ref={scannerRef}></div> */}

        </Fragment>
    );
};

const generateRandomMaNV = (): string => {
    const randomMa = Math.random().toString(36).substr(2, 5).toUpperCase(); // Generate 5 characters
    return `NV${randomMa}`;
};

const generateRandomPassword = (): string => {
    const randomPassword = Math.floor(Math.random() * 90000) + 10000; // Generate random 5-digit number
    return `${randomPassword}`;
};

export default AddNhanVien;
