import { Dialog,Box,Typography,Grid } from "@mui/material"
import classes from './SubCat.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { Salon } from "../../assets/data";
import {Slide} from "@mui/material";
import { useState,useEffect } from "react";

export const SubCatPopUp = ({open,onClose})=>{
    const handleClose= ()=>{
        onClose();
    }
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
       <div className="poppup popup-modal">
          
          <Dialog 
                 fullWidth
                 fullScreen={fullScreen}
                 open={open} onClose={onClose}
                 className={classes['dialog']}
                 >
               <div className={classes['wrapper']}>
                <CloseIcon onClick={handleClose} className={classes['icon']}/>
               <div className={classes['dialog-title']}><Typography>Women's Salon Spa and Laser Clinic</Typography></div>&nbsp;
                <Box>
                        <div className={classes['container']}>
                                <div className={classes['sub-category']}>
                                    <div className={classes['sub-category-name']}><Typography>Salon For Women</Typography></div>
                            <Grid container spacing={2}>
                                
                                 {
                                     Salon.map((item)=>(
                                        <Grid item xs={4} sm={3} md={3} lg={3}>
                                        <div className={classes['category-cards']} key={item.id}>
                                                <div className={classes['image-Box']}><img src={item.url} alt="img" /></div>
                                                <div className={classes['card-name']}><Typography>{item.name}</Typography></div> 
                                        </div>
                                       </Grid>
                                     ))
                                    }
                            </Grid>
                                    </div>
                                <div className={classes['sub-category']}>
                                    <div className={classes['sub-category-name']}><Typography>Salon For Women</Typography></div>
                            <Grid container spacing={2}>
                                
                                 {
                                     Salon.map((item)=>(
                                        <Grid item xs={4} sm={3} md={3} lg={3}>
                                        <div className={classes['category-cards']} key={item.id}>
                                                <div className={classes['image-Box']}><img src={item.url} alt="img" /></div>
                                                <div className={classes['card-name']}><Typography>{item.name}</Typography></div>
                                        </div>
                                       </Grid>
                                     ))
                                    }
                            </Grid>
                                    </div> 
                   </div>
                </Box>    
               </div>
               
          </Dialog>
       </div>
    )
}
export default SubCatPopUp

{/* <div>Women's Salon Spa and Laser Clinic</div>
        <div>
            <div>
                <div>Salon & Spa</div>
                <div>
                    <div>
                        <div><img src="IMg" alt="img" /></div>
                        <div>Salon For women</div>
                    </div>
                </div>
            </div>
            <div>
                <div>Laser Clinic</div>
                <div>
                   <div>
                        <img src="IMg" alt="img" /></div>
                        <div>Salon For women</div>
                  </div>
            </div>
        </div> */}