import React from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string | null;
}

export default class ErrorBoundary extends React.Component<
    any,
    ErrorBoundaryState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: null,
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ hasError: true, errorMessage: error?.message });
        console.log("This is an Error");
        console.log(error);
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        }

        return this.props.children;
    }
}
