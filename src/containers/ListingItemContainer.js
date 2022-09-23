import React from "react";

import { Listing } from "../components";

const ListingItemContainer = ({ featured, width }) => {
  
  return (
    <Listing width={width}>
      <Listing.Top>
        <Listing.TopItem>
          <Listing.Image src={featured.image1} />
          <Listing.TopItemContainer>
            <Listing.TopItemInfo>
              <Listing.Icon></Listing.Icon>
              <Listing.Text location>{featured.city}</Listing.Text>
            </Listing.TopItemInfo>
          </Listing.TopItemContainer>
        </Listing.TopItem>
      </Listing.Top>
      <Listing.Bottom>
        <Listing.BottomItem>
          <Listing.Title>
            <Listing.Anchor to={`/property/${featured._id}`}>
              {featured.title}
            </Listing.Anchor>
          </Listing.Title>
          <Listing.Price>RS: {featured.price}</Listing.Price>
          <Listing.Text description>
            {featured.description.substring(0, 100)}
            
            <Listing.ButtonDiv>  
            <Listing.Button>
             <Listing.Anchor to={`/property/${featured._id}`}>
                Details
              </Listing.Anchor>
            </Listing.Button>
          </Listing.ButtonDiv>

          </Listing.Text>
          
        </Listing.BottomItem>
      </Listing.Bottom>
    </Listing>
  );
};

export default ListingItemContainer;
