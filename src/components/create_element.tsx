import React, { PropsWithChildren } from "react";

type CreateElementPropsType<T> = {
	children?: React.ReactNode;
	otherData?: any;
	funcEdit?: (child: React.ReactNode, ...otherData: any) => React.ReactNode;
	data: T;
	Tag: React.ElementType;
	style?: string;
	key?: number;
};

const CreateElement = <T extends object>(props: PropsWithChildren<CreateElementPropsType<T>>): JSX.Element => {
	return props.children ? (
		<props.Tag {...props.data}>
			{React.Children.map(props.children, (child: React.ReactNode) => {
				return props.funcEdit ? props!.funcEdit(child, props.otherData) : child;
			})}
		</props.Tag>
	) : (
		<props.Tag {...props.data} />
	);
};

export { CreateElement };
