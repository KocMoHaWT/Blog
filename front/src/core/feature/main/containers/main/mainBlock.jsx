import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from '../../../../shared/markdown/markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const { posts, title } = props;
  // eslint-disable-next-line no-undef,no-unused-vars
  const [ persedPosts, setParsedPosts] = useState([]);

  useEffect(() => {

  const getAll = async () => {
    const arr = await Promise.all([...posts.map(post => fetch(post))]);
    const textArr = await  Promise.all(arr.map(e => e.text()));
    await setParsedPosts(textArr);
  };
  getAll();
  }, [posts]);
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {persedPosts.map((post, index) => (
        <Markdown className={classes.markdown} key={posts[index].substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
