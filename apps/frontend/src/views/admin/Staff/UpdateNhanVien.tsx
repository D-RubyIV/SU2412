import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Snackbar,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { format } from 'date-fns';

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
    ngaySinh: string; // Changed to string to match expected date format from the API
    trangThai?: string;
    ghiChu?: string;
    tinh: string;
    quan: string;
    phuong: string;
    deleted?: boolean;
}

interface Tinh {
    id: string;
    name: string;
    full_name: string;
}

interface Quan {
    id: string;
    name: string;
    full_name: string;
}

interface Phuong {
    id: string;
    name: string;
    full_name: string;
}

const UpdateNhanVien: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const initialStaffState: Staff = {
        ma: '',
        email: '',
        password: '',
        gioiTinh: true,
        soDienThoai: '',
        cccd: '',
        diaChi: '',
        hoTen: '',
        ngaySinh: '', // Ensure this is a string for date input
        tinh: '',
        quan: '',
        phuong: '',
        trangThai: 'active'
    };

    const [staff, setStaff] = useState<Staff>(initialStaffState);
    const [formErrors, setFormErrors] = useState<Partial<Staff>>({});
    const [provinces, setProvinces] = useState<Tinh[]>([]);
    const [districts, setDistricts] = useState<Quan[]>([]);
    const [wards, setWards] = useState<Phuong[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchStaffById(id);
        }
        fetchProvinces();
    }, [id]);

    useEffect(() => {
        if (staff.tinh) {
            const province = provinces.find(prov => prov.full_name === staff.tinh);
            if (province) {
                fetchDistricts(province.id);
            }
        }
    }, [staff.tinh, provinces]);

    useEffect(() => {
        if (staff.quan) {
            const district = districts.find(dist => dist.full_name === staff.quan);
            if (district) {
                fetchWards(district.id);
            }
        }
    }, [staff.quan, districts]);

    useEffect(() => {
        console.log("Staff state changed:", staff);
    }, [staff]);

    const fetchStaffById = async (staffId: string) => {
        try {
            const response = await axios.get<Staff>(`http://localhost:8080/api/staffs/${staffId}`);
            const staffData = response.data;
            staffData.ngaySinh = staffData.ngaySinh ? format(new Date(staffData.ngaySinh), 'yyyy-MM-dd') : '';
            setStaff(staffData);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | { name?: any; value: any }>) => {
        const { name, value } = e.target;
        setStaff({ ...staff, [name]: value });
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
            const data = response.data;
            if (data.error === 0) {
                setDistricts(data.data);
            } else {
                console.error('Lỗi khi tải dữ liệu quận/huyện:', data.message);
            }
        } catch (error) {
            console.error(`Lỗi khi gọi API quận/huyện với provinceId ${provinceId}:`, error);
        }
    };

    const fetchWards = async (districtId: string) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            const data = response.data;
            if (data.error === 0) {
                setWards(data.data);
            } else {
                console.error('Lỗi khi tải dữ liệu phường/xã:', data.message);
            }
        } catch (error) {
            console.error(`Lỗi khi gọi API phường/xã với districtId ${districtId}:`, error);
        }
    };

    const handleProvinceChange = (event: React.ChangeEvent<{ value: any }>) => {
        const province = (event.target.value as string);
        setStaff({ ...staff, tinh: province, quan: '', phuong: '' });
        const selectedProvince = provinces.find(p => p.full_name === province);
        if (selectedProvince) {
            fetchDistricts(selectedProvince.id);
        }
    };

    const handleDistrictChange = (event: React.ChangeEvent<{ value: any }>) => {
        const district = (event.target.value as string);
        setStaff({ ...staff, quan: district, phuong: '' });
        const selectedDistrict = districts.find(d => d.full_name === district);
        if (selectedDistrict) {
            fetchWards(selectedDistrict.id);
        }
    };

    const handleWardChange = (event: React.ChangeEvent<{ value: any }>) => {
        const ward = (event.target.value as string);
        setStaff({ ...staff, phuong: ward });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await axios.put<Staff>(`http://localhost:8080/api/staffs/${id}`, staff);
            setSnackbarMessage('Staff updated successfully');
            setFormErrors({});
            setSnackbarOpen(true);
            navigate('/manage/nhan-vien');
        } catch (error) {
            console.error('Error updating staff:', error);
            setSnackbarMessage('Error updating staff');
            setSnackbarOpen(true);
        }
    };

    const validateForm = (): Partial<Staff> => {
        const errors: Partial<Staff> = {};
        if (!staff.hoTen) errors.hoTen = 'Name is required';
        if (!staff.soDienThoai) errors.soDienThoai = 'Phone number is required';
        if (!staff.email) errors.email = 'Email is required';
        if (!staff.cccd) errors.cccd = 'ID card number is required';
        if (!staff.ngaySinh) errors.ngaySinh = 'Date of birth is required';
        if (!staff.diaChi) errors.diaChi = 'Address is required';
        if (!staff.tinh) errors.tinh = 'Province is required';
        if (!staff.quan) errors.quan = 'District is required';
        if (!staff.phuong) errors.phuong = 'Ward is required';
        return errors;
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Fragment>
            <Grid item>
                <Typography variant="h5" color="textPrimary" fontWeight="bold" style={{ color: '#666' }}>
                    CẬP NHẬT THÔNG TIN NHÂN VIÊN
                </Typography>
            </Grid>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="hoTen"
                            value={staff.hoTen}
                            onChange={handleInputChange}
                            label="Họ và tên"
                            error={!!formErrors.hoTen}
                            helperText={formErrors.hoTen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="soDienThoai"
                            value={staff.soDienThoai}
                            onChange={handleInputChange}
                            label="Số điện thoại"
                            error={!!formErrors.soDienThoai}
                            helperText={formErrors.soDienThoai}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="email"
                            value={staff.email}
                            onChange={handleInputChange}
                            label="Email"
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="cccd"
                            value={staff.cccd}
                            onChange={handleInputChange}
                            label="Số CCCD"
                            error={!!formErrors.cccd}
                            helperText={formErrors.cccd}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="diaChi"
                            value={staff.diaChi}
                            onChange={handleInputChange}
                            label="Địa chỉ"
                            error={!!formErrors.diaChi}
                            helperText={formErrors.diaChi}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Ngày sinh"
                            type="date"
                            name="ngaySinh"
                            value={staff.ngaySinh}
                            onChange={handleInputChange}
                            error={!!formErrors.ngaySinh}
                            helperText={formErrors.ngaySinh}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth required margin="normal">
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                name="tinh"
                                value={staff.tinh || ""}
                                onChange={handleProvinceChange}
                                label="Tỉnh/Thành phố"
                            >
                                {provinces.map(province => (
                                    <MenuItem key={province.id} value={province.full_name}>{province.full_name}</MenuItem>
                                ))}
                            </Select>
                            {formErrors.tinh && <Typography color="error">{formErrors.tinh}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth required margin="normal">
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                name="quan"
                                value={staff.quan || ""}
                                onChange={handleDistrictChange}
                                label="Quận/Huyện"
                                disabled={!staff.tinh}
                            >
                                {districts.map(district => (
                                    <MenuItem key={district.id} value={district.full_name}>{district.name}</MenuItem>
                                ))}
                            </Select>
                            {formErrors.quan && <Typography color="error">{formErrors.quan}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth required margin="normal">
                            <InputLabel>Phường/Xã</InputLabel>
                            <Select
                                name="phuong"
                                value={staff.phuong || ""}
                                onChange={handleWardChange}
                                label="Phường/Xã"
                                disabled={!staff.quan}
                            >
                                {wards.map(ward => (
                                    <MenuItem key={ward.id} value={ward.full_name}>{ward.full_name}</MenuItem>
                                ))}
                            </Select>
                            {formErrors.phuong && <Typography color="error">{formErrors.phuong}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       <FormControl fullWidth required margin="normal">
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                name="quan"
                                value={staff.quan || ""}
                                onChange={handleDistrictChange}
                                label="Quận/Huyện"
                                disabled={!staff.tinh}
                            >
                                {districts.map(district => (
                                    <MenuItem key={district.id} value={district.full_name}>{district.name}</MenuItem>
                                ))}
                            </Select>
                            {formErrors.quan && <Typography color="error">{formErrors.quan}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Cập nhật
                        </Button>
                        <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={() => navigate('/manage/nhan-vien')}>
                            Hủy
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={
                    <Fragment>
                        <Button color="secondary" size="small" onClick={handleSnackbarClose}>
                            Đóng
                        </Button>
                    </Fragment>
                }
            />
        </Fragment>
    );
};

export default UpdateNhanVien;
