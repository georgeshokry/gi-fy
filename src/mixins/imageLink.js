export const imageLink = {
    methods:{
        getImageSrc(imageObject){
          if(imageObject){
            if(Object.keys(imageObject).length > 0){ //some times the api remove attributes so need to check 
              if(imageObject.preview_webp){
                return imageObject.preview_webp.url
              }else if(imageObject.downsized_medium){
                return imageObject.downsized_medium.url
              }
            }
          }
          },
    }
};
export default imageLink;