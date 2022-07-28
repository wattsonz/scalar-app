
import React, { Dispatch, ReactElement } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import Box, { BoxProps } from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from 'next/link'

type Props = {}

const theme = createTheme({
    palette: {
        primary: {
            main: '#0971f1',
        },
    },
});

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                // border: '1px solid',
                // borderColor: (theme) =>
                //     theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#778899', 0.15),
    '&:hover': {
        backgroundColor: alpha('#778899', 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '65ch',
        },
    },
}));

const nfaDependencyVersion =
    require('../package.json').dependencies['next-firebase-auth']
const nextDependencyVersion = require('../package.json').dependencies.next
const firebaseDependencyVersion =
    require('../package.json').dependencies.firebase



export default function Header({ email, signOut }: any): ReactElement {

    // const dispatch: any = useDispatch();
    // const authReducer = useSelector(({ authReducer }) => authReducer);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <Item>
                    <Image
                        className=""
                        src="/imgs/logo.png"
                        alt="logo"
                        height={70}
                        width={70}
                    />
                </Item>
                <Item>
                    <Box sx={{ flexGrow: 1 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search for our products…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                </Item>
                <Item>
                    {email ? (
                        <>
                            <p>Signed in as {email}</p>
                            <button
                                type="button"
                                onClick={() => {
                                    signOut()
                                }}
                            >
                                Sign out
                            </button>
                        </>
                    ) :
                        (
                            <>
                                <p>You are not signed in.</p>
                                <Link href="/login">
                                    <a>
                                        <button type="button">
                                            Sign in
                                        </button>
                                    </a>
                                </Link>
                                {/* <ThemeProvider theme={theme}>
                                    <Button color="inherit" variant="outlined">
                                        Login
                                    </Button>
                                </ThemeProvider> */}
                            </>
                        )
                    }
                </Item>
            </Box>
            <Divider />

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '0vh' }}>
                <Stack direction="row" spacing={0} >
                    <Item>
                        <Typography variant="button" display="block"  >
                            Logitech
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="button" display="block" >
                            Steelseries
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="button" display="block" >
                            Zowie
                        </Typography>
                    </Item>
                </Stack>

            </Grid>
        </>
    )
}