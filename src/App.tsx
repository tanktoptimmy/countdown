import React, { useState } from 'react'
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import './App.css'
import Canvas from "./canvas";
import Clock from "./clock";
import Hero from "./hero";
import useClocks from "./hooks/useClocks"

function App() {

  // const [clockNumber, setClockNumber]= useState(1);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });


  const Main = () => {
    const { status, data, error, isFetching } = useClocks();

    const clockLists = data?.data.clockLists;
    if(!clockLists) return;

    console.log();
    return (
      <>
      <div className="bg-container">
          <Canvas
          resolution={1000}
          scale={200}
          speed={5}
          bgColours={clockLists[1].backgroundColours} 
          />
          
      </div>
      <div className="main">
      { status === "loading" ? (
        "Loading..."
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Hero title={clockLists[1].name}/>
          <div className="app">      
            
             {
            clockLists[1].clocks &&
              clockLists[1].clocks.length > 0 ?
                clockLists[1].clocks.map(
                    cl => <Clock
                      id={cl.id}
                      key={cl.id}
                      backgroundColour={cl.backgroundColour}
                      backgroundImage={cl.backgroundImage}
                      startTime={cl.startTime}
                      event={cl.event}
                      />
                    )
            :(
            <div>NOPE</div>
            )}
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
    </>
    )
  }
  


  return (
    <>
    
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        
        <Main/>
      </PersistQueryClientProvider>
    </>
  );
}

export default App
