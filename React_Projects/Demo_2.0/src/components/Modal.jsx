import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    Modal, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    IconButton, 
    InputAdornment,
    Alert
} from '@mui/material';
import { 
    X, 
    Eye, 
    EyeOff, 
    Mail, 
    Lock 
} from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { 
    loginUser, 
    registerUser, 
    googleSignIn, 
    forgotPassword 
} from '../redux/slices/authSlice';

// Validation Schemas
const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
});

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
});

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
});

const ModalForm = ({ 
    open, 
    handleClose, 
    mode = 'signin' 
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [currentMode, setCurrentMode] = useState(mode);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            switch(currentMode) {
                case 'signin':
                    await dispatch(loginUser(values)).unwrap();
                    navigate('/dashboard');
                    break;
                case 'signup':
                    await dispatch(registerUser(values)).unwrap();
                    navigate('/dashboard');
                    break;
                case 'forgotpassword':
                    await dispatch(forgotPassword(values.email)).unwrap();
                    break;
            }
            handleClose();
            resetForm();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await dispatch(googleSignIn()).unwrap();
            navigate('/dashboard');
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    const renderForm = () => {
        const initialValues = currentMode === 'signin' 
            ? { email: '', password: '' }
            : currentMode === 'signup'
            ? { email: '', password: '', confirmPassword: '' }
            : { email: '' };

        const validationSchema = currentMode === 'signin' 
            ? SignInSchema 
            : currentMode === 'signup'
            ? SignUpSchema
            : ForgotPasswordSchema;

        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ 
                    errors, 
                    touched, 
                    isSubmitting, 
                    handleChange, 
                    handleBlur, 
                    values 
                }) => (
                    <Form>
                        {/* Email Field */}
                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mail size={20} />
                                    </InputAdornment>
                                )
                            }}
                        />

                        {/* Password Fields */}
                        {currentMode !== 'forgotpassword' && (
                            <>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    variant="outlined"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock size={20} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {currentMode === 'signup' && (
                                    <TextField
                                        fullWidth
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Confirm Password"
                                        variant="outlined"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock size={20} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            </>
                        )}

                        {/* Error Handling */}
                        {error && (
                            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            disabled={isSubmitting}
                            sx={{ 
                                mt: 2, 
                                py: 1.5,
                                fontWeight: 'bold' 
                            }}
                        >
                            {isSubmitting 
                                ? 'Processing...' 
                                : currentMode === 'signin' 
                                    ? 'Sign In' 
                                    : currentMode === 'signup' 
                                        ? 'Sign Up' 
                                        : 'Reset Password'
                            }
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    };

    return (
        <Modal 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="modal-title"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box 
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 4,
                    outline: 'none'
                }}
            >
                {/* Header */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 3 
                }}>
                    <Typography 
                        id="modal-title" 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary' 
                        }}
                    >
                        {currentMode === 'signin' 
                            ? 'Sign In' 
                            : currentMode === 'signup' 
                                ? 'Sign Up' 
                                : 'Forgot Password'
                        }
                    </Typography>
                    <IconButton 
                        onClick={handleClose} 
                        sx={{ 
                            color: 'text.secondary',
                            '&:hover': { 
                                bgcolor: 'action.hover' 
                            } 
                        }}
                    >
                        <X size={24} />
                    </IconButton>
                </Box>

                {renderForm()}

                {currentMode === 'signin' && (
                    <>
                        {/* Divider */}
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                my: 2 
                            }}
                        >
                            <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    mx: 2, 
                                    color: 'text.secondary' 
                                }}
                            >
                                or
                            </Typography>
                            <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                        </Box>

                        {/* Google Sign-In */}
                        <Button
                            fullWidth
                            variant="outlined"
                            color='secondary'
                            onClick={handleGoogleSignIn}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                py: 1.5
                            }}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 256 262"
                            >
                                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            Continue with Google
                        </Button>
                    </>
                )}

                {/* Additional Links */}
                <Box 
                    sx={{ 
                        mt: 2, 
                        display: 'flex', 
                        justifyContent: 'space-between' 
                    }}
                >
                    {currentMode === 'signin' && (
                        <Button 
                            size="small" 
                            color="secondary" 
                            variant="text"
                            onClick={() => setCurrentMode('forgotpassword')}
                        >
                            Forgot Password?
                        </Button>
                    )}
                    <Button 
                        size="small" 
                        color="secondary" 
                        variant="text"
                        onClick={() => setCurrentMode(currentMode === 'signin' ? 'signup' : 'signin')}
                    >
                        {currentMode === 'signin' 
                            ? 'Create Account' 
                            : currentMode === 'signup' 
                                ? 'Back to Sign In' 
                                : 'Back to Sign In'
                        }
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalForm;