import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Box,
    InputAdornment,
    Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import { SearchOutlined } from '@mui/icons-material';

interface Staff {
    id: string;
    ma: string;
    hoTen: string;
    gioiTinh: boolean;
    soDienThoai: string;
    cccd: string;
    ngaySinh: string;
    diaChi: string;
    phuong: string;
    quan: string;
    tinh: string;
    trangThai: string;
    email: string;
}

const ManageStaffComponent: React.FC = () => {
    const navigate = useNavigate();

    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({
        totalPages: 0,
        currentPage: 0,
        totalItems: 0,
        pageSize: 5,
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchStaffList();
    }, [pagination.currentPage, searchTerm, filterStatus]);

    const fetchStaffList = async () => {
        setIsLoading(true);
        try {
            const params: any = {
                offset: pagination.currentPage * pagination.pageSize,
                limit: pagination.pageSize,
                keyword: searchTerm,
            };
    
            if (filterStatus !== 'all') {
                params.trangThai = filterStatus;
            }
    
            const response = await axios.get(
                `http://localhost:8080/api/staffs/search`, {
                    params
                }
            );
            console.log('API Response:', response.data); // Debug response
            setStaffList(response.data.content);
            setPagination({
                ...pagination,
                totalPages: response.data.totalPages,
                totalItems: response.data.totalElements,
            });
        } catch (error) {
            let errorMessage = 'Lỗi khi tải danh sách nhân viên!';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = `Lỗi khi tải danh sách nhân viên: ${error.response.data.message || error.message}`;
            } else if (error instanceof Error) {
                errorMessage = `Lỗi khi tải danh sách nhân viên: ${error.message}`;
            }
            console.error('Error fetching staff list:', error);
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    

    const handleAddNhanVienClick = () => {
        navigate('/manage/add-nhan-vien');
    };

    const handleEditNhanVien = (staff: Staff) => {
        navigate(`/manage/update-nhan-vien/${staff.id}`);
    };

    const handleDeleteStaff = async (staffId: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/staffs/${staffId}`);
            fetchStaffList();
            setSnackbarMessage('Xóa nhân viên thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting staff:', error);
            setSnackbarMessage('Lỗi khi xóa nhân viên!');
            setSnackbarOpen(true);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            currentPage: value - 1,
        }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterStatus(event.target.value as string);
    };

    const renderTableRows = () => {
        if (staffList.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={9} align="center">Không có kết quả tìm thấy</TableCell>
                </TableRow>
            );
        }

        return staffList.map((staff, index) => (
            <TableRow key={staff.id}>
                <TableCell>{pagination.currentPage * pagination.pageSize + index + 1}</TableCell>
                <TableCell>{staff.ma}</TableCell>
                <TableCell>{staff.hoTen}</TableCell>
                <TableCell>{staff.gioiTinh ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell>{staff.soDienThoai}</TableCell>
                <TableCell>{staff.cccd}</TableCell>
                <TableCell>{format(new Date(staff.ngaySinh), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                    <Box
                        sx={{
                            padding: '8px',
                            backgroundColor: staff.trangThai === 'inactive' ? '#9fa8da' : '#bbdefb',
                            borderRadius: '20px',
                            textAlign: 'center',
                        }}
                    >
                        {staff.trangThai === 'inactive' ? 'Đã nghỉ làm' : 'Đang làm việc'}
                    </Box>
                </TableCell>
                <TableCell>
                    <IconButton onClick={() => handleEditNhanVien(staff)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStaff(staff.id)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ));
    };

    const handleSearchButtonClick = () => {
        fetchStaffList();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Fragment>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                <Grid item>
                <Typography variant="h5" color="textPrimary" fontWeight="bold" style={{ color: '#666' }}>
                    QUẢN LÝ NHÂN VIÊN
                </Typography>
            </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Input
                        name="keyword"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        size="small"
                        className="p-2"
                        placeholder="Tìm Kiếm Theo Mã, Họ Và Tên, SDT, CCCD..."
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchOutlined />
                            </InputAdornment>
                        }
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Trạng thái</InputLabel>
                        <Select value={filterStatus} onChange={handleFilterChange} label="Trạng thái">
                            <MenuItem value="all">Tất cả</MenuItem>
                            <MenuItem value="active">Đang làm việc</MenuItem>
                            <MenuItem value="inactive">Đã nghỉ làm</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddNhanVienClick}>
                        Thêm nhân viên
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table size="small" sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: '14px' }}>STT</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>Mã nhân viên</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>Họ tên</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>Giới tính</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>Số điện thoại</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>CCCD</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>Ngày sinh</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>Trạng thái</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    renderTableRows()
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <Pagination
                        count={pagination.totalPages}
                        page={pagination.currentPage + 1}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Fragment>
    );
};

export default ManageStaffComponent;
