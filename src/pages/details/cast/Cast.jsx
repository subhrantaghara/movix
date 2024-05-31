import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => (
        <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    data && data.length > 0 ? (
                        <div className="listItems">
                            {data?.map((item) => {
                                const imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;
                                return (
                                    <div key={item.id} className="listItem">
                                        <div className="profileImg">
                                            <Img src={imgUrl} />
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">{item.character}</div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div>No cast data available.</div>
                    )
                ) : (
                    <div className="castSkeleton">
                        {[...Array(6)].map((_, index) => (
                            <React.Fragment key={index}>{skeleton()}</React.Fragment>
                        ))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
