local bint = require('.bint')(256)
local ao = require('ao')

local json = require('json')

-- init with default values
local Nfts = {
    ["rzzJsdJhRRjkMh26RxFEwGpzvF2DjyBixfEiWsT52tg"] = {
        {id = 0, url = "url1", timestamp = "...", signature="dasds", location="Pune"},
        {id = 1, url = "url1", timestamp = "...", signature="dasds", location="Pune"}
    }
}

local addr_nfts = {
    {id = 0, url = "url1", timestamp = "...", signature="dasds", location="Pune"},
    {id = 1, url = "url1", timestamp = "...", signature="dasds", location="Pune"}
}

Handlers.add('register_camera', Handlers.utils.hasMatchingTag('Action', 'RegisterCamera'), function (msg)

    Nfts[msg.MachineID] = {}
    Handlers.utils.reply("Machine Registered")(msg)
    
end
)

Handlers.add('get_cameras', Handlers.utils.hasMatchingTag('Action', 'GetCameras'), function (msg)

    for key, _ in pairs(Nfts) do 
        ao.send({Target = msg.From, Data = key})
    end
    
end
)



Handlers.add('mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), function (msg)


    local count = 0
    for _ in ipairs(Nfts[msg.MachineID]) do
        count = count + 1
    end

    local new_nft = {
        id = count+1,
        url = msg.Url,
        timestamp = msg.Timestamp,
        signature = msg.signature,
        location = "Pune"
    }

    table.insert(Nfts[msg.MachineID], new_nft)

    Handlers.utils.reply("NFT Added")(msg)
    
end
)

Handlers.add('get_nft_count', Handlers.utils.hasMatchingTag('Action', 'GetNFTCount'), function (msg)


    local count = 0
    for _ in ipairs(Nfts[msg.MachineID]) do
        count = count + 1
    end

    local msgo = "Total NFT's: " .. tostring(count)

    Handlers.utils.reply(msgo)(msg)
    
end
)


Handlers.add('get_nft', Handlers.utils.hasMatchingTag('Action', 'GetNFTIndex'), function (msg)


    local nfts = Nfts[msg.MachineID]

    for index, value in ipairs(nfts) do 
        local msgo = "{id: " .. tostring(value.id) .. ", url: " .. tostring(value.url) .. ", timestamp: " .. tostring(value.timestamp) .. ", signature: " .. tostring(value.signature)  .. ", location: " .. tostring(value.location) .. "}" 
        ao.send({Target = msg.From, Data = tostring(msgo)})
    end
    

end
)



-- Handlers.add('mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), function (msg)

--   if not Balances[ao.id] then Balances[ao.id] = "0" end

--   if msg.From == ao.id then
--     -- Add tokens to the token pool, according to Quantity
--     Balances[msg.From] = tostring(bint.__add(Balances[Owner], msg.Quantity))
--     ao.send({
--       Target = msg.From,
--       Data = Colors.gray .. "Successfully minted " .. Colors.blue .. msg.Quantity .. Colors.reset
--     })
--   else
--     ao.send({
--       Target = msg.From,
--       Action = 'Mint-Error',
--       ['Message-Id'] = msg.Id,
--       Error = 'Only the Process Owner can mint new ' .. Ticker .. ' tokens!'
--     })
--   end
-- end)