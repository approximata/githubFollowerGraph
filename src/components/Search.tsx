import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';

import { SearchResult, UserVars, UserNode } from '../interface/interface';
import { GET_USER_RESULT } from '../querys/userQuerys';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
    }),
);

const Search = (props: {selectedUser: String, setSelectedUserLogin: React.Dispatch<React.SetStateAction<string>>}) => {

    const [searchTerm, setSearchTerm] = React.useState('');

    const classes = useStyles();

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSearchTerm(event.target.value)
    };

    const { loading, data } = useQuery<SearchResult, UserVars>(
        GET_USER_RESULT,
        { variables: { loginSearch: searchTerm } }
    );

    return (
        <div>
            <div>
                <List>
                    <Divider />

                    <ListItem>

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search for user..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchTerm}
                                onChange={handleChange}
                            />
                        </div>

                    </ListItem>
                    
                    <Divider />
                    {loading ? <p>Loading...</p> : 
                        data && data.search && data.search.edges.map((user: UserNode) => (
                        <ListItem button 
                            key={user.node.id}
                                selected={props.selectedUser === user.node.login}
                            onClick={() => {
                                props.setSelectedUserLogin(user.node.login)
                            }}                            
                        >
                            <ListItemAvatar>
                                <Avatar alt={user.node.name} src={`${user.node.avatarUrl}`} />
                            </ListItemAvatar>
                                <ListItemText 
                                    primary={user.node.login}
                                    secondary={user.node.name}
                                >
                            </ListItemText>
                        </ListItem>
                    ))}
                </List> 
            </div>
        </div>
    )
};

export default Search;