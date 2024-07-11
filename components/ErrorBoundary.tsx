import React from "react";
import { Button } from "./ui/button";

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
        this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ hasError: true, errorMessage: error?.message });
        // console.log("This is an Error");
        console.log(error);
    }

    resetErrorBoundary() {
        this.setState({ hasError: false, errorMessage: null });
        window.location.reload();
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>{this.state.errorMessage}</h1>
                    <Button onClick={this.resetErrorBoundary}>Reset</Button>
                </>
            );
        }

        return this.props.children;
    }
}
