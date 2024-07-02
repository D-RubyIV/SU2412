import { Breadcrumbs, Button, Input, InputAdornment, InputLabel, Link } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from "antd";
import { AccountCircle, PlusOneOutlined, SearchOutlined } from "@mui/icons-material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const ManageBillComponent = () => {
    return (
        <Fragment>
            <div>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/manage"
                        >
                            Quản lý
                        </Link>
                        <Typography color="text.primary">Hóa đơn</Typography>
                    </Breadcrumbs>
                </div>

                <div>
                    {/* Menu */}
                    <div className="flex gap-5 py-2">
                        {/* Tìm kiếm */}
                        <Input className="w-full" placeholder="Tìm kiếm hóa đơn"></Input>
                        <Button variant="outlined">
                            <SearchOutlined ></SearchOutlined>
                        </Button>
                    </div>
                    <div className="flex gap-5 py-2">
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-start-date">
                                Từ ngày
                            </InputLabel>
                            <Input
                                id="input-start-date"
                                type="date"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-end-date">
                                Đến ngày
                            </InputLabel>
                            <Input
                                id="input-end-date"
                                type="date"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" className="text-sm">Loại</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio size="small" />} label="Trực tuyến" />
                                <FormControlLabel value="male" control={<Radio size="small" />} label="Tại quầy" />
                            </RadioGroup>
                        </FormControl>
                        <div className="flex gap-5">
                            <Button variant="outlined" size="small">Thêm hóa đơn</Button>
                            <Button variant="outlined" size="small">Quét mã</Button>
                            <Button variant="outlined" size="small">Xuất excel</Button>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                     
                    {/* Bảng */}
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ManageBillComponent;