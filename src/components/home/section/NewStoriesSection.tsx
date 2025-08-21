import React from "react";
import GridTwoRowLayout from "../../common/GridTwoRowLayout";

interface NewStoriesSectionProps {
  stories: any[];
}

const NewStoriesSection: React.FC<NewStoriesSectionProps> = ({ stories }) => {
  return <GridTwoRowLayout data={stories} />;
};

export default NewStoriesSection;
