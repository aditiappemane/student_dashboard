import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Grid,
    Box,
    Typography
} from '@mui/material';

const AddStudent = ({ onStudentAdded }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        class: '',
        status: 'active',
        feeStatus: 'unpaid',
        sports: []
    });
    const [classOptions, setClassOptions] = useState([]);
    const [loadingClasses, setLoadingClasses] = useState(false);

    const sportsOptions = ['Cricket', 'Football', 'Volleyball', 'Hockey', 'Kabaddi'];

    const fetchClasses = async () => {
        setLoadingClasses(true);
        try {
            const res = await axios.get('http://localhost:5000/api/students/classes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setClassOptions(res.data);
        } catch (err) {
            setClassOptions([]);
        } finally {
            setLoadingClasses(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchClasses();
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSportsChange = (sport) => {
        setFormData(prev => ({
            ...prev,
            sports: prev.sports.includes(sport)
                ? prev.sports.filter(s => s !== sport)
                : [...prev.sports, sport]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/students', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            onStudentAdded(response.data);
            handleClose();
            setFormData({
                name: '',
                class: '',
                status: 'active',
                feeStatus: 'unpaid',
                sports: []
            });
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData({
            name: '',
            class: '',
            status: 'active',
            feeStatus: 'unpaid',
            sports: []
        });
        setOpen(false);
    };
    

    return (
        <>
<Box sx={{ position: 'absolute', top: 80, right: 16, zIndex: 10 }}>
<Button
    variant="contained"
    color="primary"
    onClick={handleOpen}
  >
    Add Student
  </Button>
</Box>


            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogContent dividers sx={{ minHeight: '500px' }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                            <FormControl
  fullWidth
  required
  variant="outlined"
  sx={{ minWidth: 120 }} 
>
  <InputLabel id="class-label">Class</InputLabel>
  <Select
    labelId="class-label"
    name="class"
    value={formData.class}
    onChange={handleChange}
    label="Class"
    sx={{
      width: '100%',               
      '& .MuiSelect-select': {
        minWidth: 100,             
        display: 'flex',
        alignItems: 'center',
      }
    }}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 200
        }
      }
    }}
  >
    {classOptions.map((classNum) => (
      <MenuItem key={classNum} value={classNum}>
        {classNum}
      </MenuItem>
    ))}
  </Select>
</FormControl>


                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="status-label">Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        label="Status"
                                        sx={{ height: '56px' }}
                                    >
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="fee-status-label">Fee Status</InputLabel>
                                    <Select
                                        labelId="fee-status-label"
                                        name="feeStatus"
                                        value={formData.feeStatus}
                                        onChange={handleChange}
                                        label="Fee Status"
                                        sx={{ height: '56px' }}
                                    >
                                        <MenuItem value="paid">Paid</MenuItem>
                                        <MenuItem value="unpaid">Unpaid</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Sports (Select at least one)
                                </Typography>
                                <FormGroup row sx={{ flexWrap: 'wrap' }}>
                                    {sportsOptions.map((sport) => (
                                        <FormControlLabel
                                            key={sport}
                                            sx={{ minWidth: '140px' }}
                                            control={
                                                <Checkbox
                                                    checked={formData.sports.includes(sport)}
                                                    onChange={() => handleSportsChange(sport)}
                                                />
                                            }
                                            label={sport}
                                        />
                                    ))}
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Add Student
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddStudent;
