import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react'
import { Button } from '@mui/material';
import Link from 'next/link';

function BackButton() {
    return (
        <div>
            <Link
                href={{
                    pathname: `/`,

                }} >
                <Button>
                    <ArrowBackIosNewIcon />
                </Button>
            </Link>
        </div>
    )
}

export default BackButton