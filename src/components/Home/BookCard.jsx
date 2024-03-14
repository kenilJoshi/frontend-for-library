import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';

function BookCard({book}) {
   
    

  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardActionArea className='!w-80'>
        {/* <CardMedia
          className='h-80'
          component="img"
          height="140"
          image={myImageUrl}
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='text-stone-800'>
            {book.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='text-stone-800'>
            {book.description || 'book'}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Borrow</Button>
      </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default BookCard