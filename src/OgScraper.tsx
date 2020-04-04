import React, { useState, useEffect } from 'react';
import ogs from 'open-graph-scraper';
import Truncate from 'react-truncate';
import styled from 'styled-components';

const OgScraper: React.FC = () => {
    const [rs, setRs] = useState<any>('');
    const [error, setErr] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const staticObject = {
        ogTitle: 'Open Graph protocol',
        ogType: 'website',
        ogUrl: 'http://ogp.me/',
        ogDescription:
            'The Open Graph protocol enables any web page to become a rich object in a social graph.',
        ogImage: {
            url: 'http://ogp.me/logo.png',
            width: '300',
            height: '300',
            type: 'image/png',
        },
    };

    const onPress = () => {
        setErr('');
        ogs({ url: value }, function(err: any, results: any) {
            if (err) {
                setErr('Error');
            }
            if (results) {
                if (results.error) {
                    setErr(results.error);
                    setRs(staticObject);
                } else {
                    setRs(results.data);
                }
            }
        });
    };

    useEffect(() => {
        setErr('');
        setRs('');
    }, [value]);

    return (
        <>
            <h1>React Open Graph Preview</h1>
            <InputContainer>
                <TitleInput
                    placeholder={'URL'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <Btn onClick={onPress}>enter</Btn>
            </InputContainer>
            {error && (
                <>
                    <ErrorMsg>{error}</ErrorMsg>
                    <ErrorNoti>
                        If you're using local address, re-try with CORS
                        extension.{' '}
                    </ErrorNoti>
                </>
            )}
            {rs && (
                <Container>
                    {Object.keys(rs.ogImage).length === 4 && (
                        <ImageLayout>
                            <img src={rs.ogImage.url} alt="img" />
                        </ImageLayout>
                    )}
                    <ContentsLayout>
                        {rs.ogTitle && (
                            <TitleText>
                                <Truncate lines={1}>{rs.ogTitle}</Truncate>
                            </TitleText>
                        )}
                        {rs.ogDescription && (
                            <DesText>
                                <Truncate lines={1}>
                                    {rs.ogDescription}
                                </Truncate>
                            </DesText>
                        )}
                        <UrlText
                            href={rs.ogUrl ? rs.ogUrl : value}
                            target="_blank"
                            rel="noopener noreferrer">
                            <Truncate lines={1}>
                                {rs.ogUrl ? rs.ogUrl : value}
                            </Truncate>
                        </UrlText>
                    </ContentsLayout>
                </Container>
            )}
            {error && <div>sample</div>}
        </>
    );
};

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 2rem;
`;

const Btn = styled.div`
    padding: 0.5rem;
    border: 1px solid black;
    cursor: pointer;
    &:hover {
        background: black;
        color: white;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    border: 1px solid black;
    width: 350px;
`;

const TitleInput = styled.input`
    font-size: 1.2rem;
    padding: 0.5rem 0;
    border: none;
    border-bottom: 1px solid darkgray;
    width: 300px;
    & ~ div {
        margin-left: 0.5rem;
    }
`;

const ImageLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
    border-right: 1px solid lightgray;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const ContentsLayout = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    overflow: hidden;
`;

const TitleText = styled.div`
    flex: 1;
    width: 100%;
    font-weight: bold;
`;

const DesText = styled.div`
    flex: 1;
    width: 100%;
    color: rgba(0, 0, 0, 0.8);
    font-size: 0.9rem;
`;

const UrlText = styled.a`
    margin-top: 10px;
    flex: 1;
    width: 100%;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.8rem;
`;

const ErrorMsg = styled.div`
    padding: 0.5rem;
    background: rgba(255, 0, 0, 0.9);
    border-radius: 4px;
    color: white;
    & ~ div {
        margin: 0.5rem 0;
    }
`;

const ErrorNoti = styled.div`
    padding: 0.3rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    color: white;
    font-size: 0.9rem;
`;

export default OgScraper;
