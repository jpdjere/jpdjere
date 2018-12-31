import React from "react";
import { Link } from 'react-router-dom'
import "./Card.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Emoji from 'react-emoji-render';
import FA from "react-fontawesome";

let renderDescription = text => {
  if(text.length > 150){
    return (
      <Emoji text={text.slice(0,250)+ " ..."} />
    )
  }
  return <Emoji text={text} />
}

const CardComponent = props => {
  const { fullName, description, language, stars, issues, url, owner, repo } = props;
//   const { fullName } = props;

  return (

      <Card className="card">
        <CardContent className="card__content">
          <div className="card__titles">
            <Typography className="card__title" color="textSecondary">
              <FA name="star" className="card__fa" /> {stars} stars
            </Typography>
            <Typography className="card__title" color="textSecondary">
              <FA name="exclamation-circle" className="card__fa" /> {issues} issues
            </Typography>
          </div>
          <Typography variant="headline" component="h2">
            {fullName}
          </Typography>
        <Typography className="card__pos" color="textSecondary">
            {language}
          </Typography>
          <Typography component="p">
            {description && renderDescription(description)}
          </Typography>
          <CardActions className="card__action">
            <a className="card__link" href={url} target="_blank">
              <Button className="card__button" size="small">
                <FA name="github" className="card__fa" />See on Github
              </Button>
            </a>
            <Link className="card__link" to={`/top/${owner}/${repo}`}>
              <Button className="card__button" size="small">
                <FA name="rocket" className="card__fa" /> TOP CONTRIBUTORS
              </Button>
            </Link>
          </CardActions>
        </CardContent>
      </Card>

  );
}

export default CardComponent;