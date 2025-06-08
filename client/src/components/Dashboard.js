import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Container,
    AppBar,
    Toolbar,
    Button,
    CircularProgress
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddStudent from './AddStudent';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
    const [stats, setStats] = useState({
        counts: {
            active: 0,
            inactive: 0,
            feePaid: 0,
            feeUnpaid: 0
        },
        classWiseData: [],
        sportsData: []
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/dashboard/stats', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            if (error.response?.status === 401) {
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };
//Ajax call for  every 5 mins
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000); 
        return () => clearInterval(interval);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleStudentAdded = () => {
        fetchData(); 
    };

    const StatCard = ({ title, value, color }) => (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 160,
                width: 160,
                bgcolor: color,
                color: 'white',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)'
                },
                position: 'relative'
            }}
        >
            <Typography component="h2" variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography component="p" variant="h4" sx={{ mt: 'auto' }}>
                {value}
            </Typography>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: 1
                    }}
                >
                    <CircularProgress size={30} sx={{ color: 'white' }} />
                </Box>
            )}
        </Paper>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Student Statistics Dashboard
                    </Typography>
                    {loading && (
                        <CircularProgress 
                            size={24} 
                            sx={{ 
                                color: 'white',
                                mr: 2
                            }} 
                        />
                    )}
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <Box mb={3}>
                    <AddStudent onStudentAdded={handleStudentAdded} />
                </Box>
                <Grid container spacing={3}>
                    {/* Statistics Cards */}
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Active Students" value={stats.counts.active} color="#4CAF50" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Inactive Students" value={stats.counts.inactive} color="#F44336" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Fee Paid" value={stats.counts.feePaid} color="#2196F3" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Fee Unpaid" value={stats.counts.feeUnpaid} color="#FF9800" />
                    </Grid>

                    {/* Class-wise Bar Chart */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                            <Typography component="h2" variant="h6" gutterBottom>
                                Class-wise Student Distribution
                            </Typography>
                            <Box sx={{ position: 'relative' }}>
                                {loading && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                                            zIndex: 1
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                )}
                                <BarChart
                                    width={700}
                                    height={300}
                                    data={stats.classWiseData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="totalStudents" name="Total Students" fill="#8884d8" />
                                    <Bar dataKey="feePaidStudents" name="Fee Paid Students" fill="#82ca9d" />
                                </BarChart>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sports Participation Pie Chart */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                            <Typography component="h2" variant="h6" gutterBottom>
                                Sports Participation
                            </Typography>
                            <Box sx={{ position: 'relative' }}>
                                {loading && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                                            zIndex: 1
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                )}
                                <PieChart width={400} height={300}>
                                    <Pie
                                        data={stats.sportsData}
                                        dataKey="count"
                                        nameKey="_id"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {stats.sportsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard; 