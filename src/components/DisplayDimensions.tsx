interface DisplayDimensionsProps {
  dimensions: {
    width: number;
    height: number;
  };
}

const DisplayDimensions = ({ dimensions }: DisplayDimensionsProps) => (
  <div className="dimensions-container">
    <h3>Estimated Dimensions</h3>
    <p>Width: {dimensions.width} cm</p>
    <p>Height: {dimensions.height} cm</p>
    <style jsx>{`
      .dimensions-container {
        text-align: center;
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #f9f9f9;
      }
    `}</style>
  </div>
);

export default DisplayDimensions;
