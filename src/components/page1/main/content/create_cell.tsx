import React from "react";

type CreateCellPropsType = {
	callBack?: (dataChild: any) => void;
	children?: React.ReactNode;
};

const CreateCell: React.FC<CreateCellPropsType> = (props): JSX.Element => {
	function show() {
		if (props.callBack) props.callBack(props.children);
		return props.children;
	}

	return <React.Fragment>{show()}</React.Fragment>;
};

export { CreateCell };
